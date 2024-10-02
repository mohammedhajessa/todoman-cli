import { readFile, writeFile } from 'node:fs/promises'
// const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = new URL('../db.json', import.meta.url)

export async function getDB() {
    try {
        const db = await readFile(DB_PATH, 'utf-8')
        return JSON.parse(db)
    } catch (error) {
        if (error.code === 'ENOENT') {
            // الملف غير موجود، قم بإنشائه مع كائن فارغ يحتوي على مصفوفة فارغة للمهام
            const initialDB = { todos: [] }
            await writeFile(DB_PATH, JSON.stringify(initialDB, null, 2), 'utf-8')
            return initialDB
        }
        throw error // إعادة رمي الأخطاء الأخرى
    }
}

export const saveDB = async (db) => {
    await writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
    return db;
}

export const insertToDB = async (type, data) => {
    const db = await getDB();
    if (!db[type]) {
        db[type] = [];
    }
    db[type].push(data);
    await saveDB(db);
    return data;
}

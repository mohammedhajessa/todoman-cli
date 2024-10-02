//Unit Testing : Testing a single function or a small part of the code
//Integration Testing : Testing a small part of the code with other part of the code
//End to End Testing : Testing a Flow of all application
//Api Testing : Testing a end point of the api
//UI Testing : Testing a UI of the application

// jest.unstable_mockModule('../src/db.js', () => ({
//   getDB: jest.fn(),
//   saveDB: jest.fn(),
//   insertToDB: jest.fn(),
// }));

// const { insertToDB, getDB, saveDB } = await import('../src/db.js');
// const { addTodo } = await import('../src/todos.js');

// beforeEach(() => {
//   insertToDB.mockClear();
//   getDB.mockClear();
//   saveDB.mockClear();
// });

// it('should add a new todo', async () => {
//   const todoContent = 'Clean the house';
//   const priority = 'High';

//   const mockTodo = { id: 123, content: todoContent, priority, done: false };

//   insertToDB.mockResolvedValue(mockTodo);

//   const result = await addTodo(todoContent, priority);

//   expect(insertToDB).toHaveBeenCalledTimes(1);
//   expect(result.content).toBe(todoContent);
// });

import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
  getDB: jest.fn(),
  saveDB: jest.fn(),
  insertToDB: jest.fn(),
}));//mocking the db module to don't use the real db

const { insertToDB, getDB, saveDB } = await import('../src/db.js');
const { addTodo } = await import('../src/todos.js');

beforeEach(() => {
  insertToDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});//clear the mock after each test to avoid the test to fail if the mock is not cleared

it('should add a new todo', async () => {
  const todoContent = 'Clean the house';
  const priority = 'High';
  const result = await addTodo(todoContent, priority);
  expect(result.content).toBe(todoContent);
  expect(result.priority).toBe('High');
});//test the addTodo function

// Create a root route `/` to return HTML to the user. 
// Create a `/users` route to return an array of users to the end user using JSON. 
// Create a `/products` to return a product as a plain string.
import http from 'node:http'
import { readFile} from 'node:fs/promises'
const server = http.createServer(async (req, res) => {
    if(req.url ==='/'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('<h1>Users Page</h1>')
    }else if (req.url ==='/users'){
        res.writeHead(200, {'Content-Type': 'application/json'})
        const users =  await readFile('users.json', 'utf-8');
        res.end(users)
    }else if (req.url ==='/products'){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('product')
    }else{
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end('<h1>Not Found Page 404</h1>')
    }

})

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000')
})

const http = require('http');
const app = require('./app');


const server = http.createServer(app);
const port = process.env.Port || 8000;




server.listen(port, () => {
    console.log("We are connected");
})
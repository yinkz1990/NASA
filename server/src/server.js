const http = require('http');
const app = require('./app');
const {mongooseConnection} = require("./services/mongo");
const { promisePlanet} = require('./models/planets.model');
const { loadSpaceXData } = require('./models/launches.model');


const server = http.createServer(app);
const port = process.env.Port || 8000;



async function startServer () {
    await mongooseConnection(), 
    await promisePlanet();
    await loadSpaceXData();
        
    
    server.listen(port, () => {
            console.log("We are connected");
        })
       
    
}

startServer();

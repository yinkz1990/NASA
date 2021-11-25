const http = require('http');
const app = require('./app');
const {mongooseConnection} = require("./services/mongo");
const { promisePlanet} = require('./models/planets.model');
const { loadSpaceXData } = require('./models/launches.model');

const server = http.createServer(app);



async function startServer () {
    await mongooseConnection(), 
    await promisePlanet();
    await loadSpaceXData();
        
    
    server.listen(process.env.PORT || 8000, '0.0.0.0', () => {
            console.log("We are connected");
        })
       
    
}

startServer();

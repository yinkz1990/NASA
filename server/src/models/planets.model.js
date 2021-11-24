const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');
const planets = require('./planet.mongo');



function isHabitablePlanet(planets){
    
    return planets['koi_disposition'] === "CONFIRMED" && planets['koi_insol'] > 0.36 &&
    planets['koi_insol'] < 1.11 & planets['koi_prad'] < 1.6;
}


function promisePlanet () {
return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", 'data', "kepler.csv"))
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', async (data) => { 
        if (isHabitablePlanet(data)){
            await savePlanet(data)
        }  
    })
    .on('error', (err) => {
        console.log(err);
        reject(err);
    })
    
    .on('end', async () => {
        const planet = await getAllplanets()
        console.log(planet.length); 
        resolve();
    })
    
    
})    
}

async function getAllplanets (){
    try{
        return await planets.find({}, {
            '_id': 0,  '__v' : 0,
        }); 
    }catch(err){
        console.error(err)
    }
}

async function savePlanet (planet){

    try{
        return await planets.updateOne({
            KeplerName : planet.kepler_name
        },{
            KeplerName : planet.kepler_name 
        },
        {
            upsert : true
        });   
    }catch(err){
        console.error(err)
    }
    
}
module.exports = {
    getAllplanets,
    promisePlanet
}
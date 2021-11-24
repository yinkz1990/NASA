const launchesData = require('./launches.mongo');
const planets = require('./planet.mongo');
const axios = require('axios');


const DEFAULT_FLIGHTNUMBER = 100;


const SPACE_X_API_URL = "https://api.spacexdata.com/v4/launches/query";


async function getSpaceXData(){
    const response = await axios.post(SPACE_X_API_URL, {
        query: {},
        options:{
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                    
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
    
                }
            ]
        }
    })
        if(response.status !== 200){
            throw new Error("Launched data download failed");
        }

        const launchDocs = response.data.docs;
        for(const launchDoc of launchDocs){
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap(payload => {
            return payload['customers']
        })
        const launch = {
            flightNumber: launchDoc['flight_number'],
            rocket: launchDoc['rocket']['name'],
            mission: launchDoc['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers
        }

        await saveLaunch(launch);

    }
    
        
}


async function loadSpaceXData (){
    const launchExist = await launchesData.findOne({
        flightNumber: 1,
        rocket: "Falcon",
        mission: "FalconSat 1"
    })
    if(launchExist){
        return;
    }
    await getSpaceXData()


}

async function getAllLaunch (limit, skip) {
    try{ 
        return await launchesData
        .find({},{
            '_id':0, '__v': 0
        })
        .sort({flightNumber: 1})
        .skip(skip)
        .limit(limit)
        
    }catch(err){
        console.error(err)
    }
    
}
async function getLastNewLaunch (){
    const lastestLaunch = await launchesData.findOne().sort('-flightNumber');
    if(!lastestLaunch){
        return DEFAULT_FLIGHTNUMBER;
    }
    return +lastestLaunch.flightNumber;
}

async function saveLaunch (launched) {  
    return await launchesData.findOneAndUpdate(
        {flightNumber : launched.flightNumber}, 
        launched,
        {upsert: true})

   
}

async function scheduleNewLaunch (launch) {
    const planet = await planets.findOne({
        KeplerName: launched.target
    })
  
    if(!planet){
        throw new Error("There is no such planet in the database");
    }
    const newFlightNumber = await getLastNewLaunch() + 1 ; 
    const newLaunch = Object.assign(launch, {
        success : true,
        upcoming : true,
        customers: ['NASA', 'KEPLERS'],
        flightNumber: newFlightNumber, 
    })
   await saveLaunch(newLaunch);
}

async function existLaunchWithId (launchId) {
 const exist = await launchesData.findOne({
        flightNumber : launchId
    })
  return exist;

}

async function abortLaunched (launchId){
   const aborted = await launchesData.updateOne({flightNumber: launchId},{
       success: false,
       upcoming: false
   });
return aborted.acknowledged === true && aborted.modifiedCount === 1;
}

module.exports = { 
    getAllLaunch,
    scheduleNewLaunch,
    existLaunchWithId,
    abortLaunched, 
    loadSpaceXData 
}
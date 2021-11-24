const {getAllLaunch, scheduleNewLaunch, existLaunchWithId, abortLaunched} = require('../../models/launches.model');
const {getPagination} = require('../../services/pagination');



async function httpGetAllLaunch  (req, res, next){
    console.log(req.query);
    const {limit, skip} = getPagination(req.query);
    return res.status(200).json(await getAllLaunch(limit, skip));
}

async function httpAddNewLaunch (req, res, next){
    const launch = req.body;
    if(!launch.mission || !launch.target || !launch.launchDate || !launch.rocket){
        return res.status(400).json({
            error: "There is a missing data"
        })
    }

    
    launch.launchDate = new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: "Invalid date"
        })
    }

    await scheduleNewLaunch(launch)
    return res.status(201).json(launch);
}

async function httpAbortLaunch (req, res, next) {
    const launchedId = Number(req.params.id);
    const exist = await existLaunchWithId(launchedId);
    if(!exist){
     return res.status(404).json({
             error: "Launch not found"    
     })
    
    }
    
   const aborted = await abortLaunched(launchedId);
   if(!aborted){
    return res.status(400).json({
        error: "Launch not aborted"
    })
   }
    return res.status(200).json({
        ok: true
    });

    
}
module.exports = {
    httpGetAllLaunch,
    httpAddNewLaunch,
    httpAbortLaunch,
}
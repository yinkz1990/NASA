const API_URL = 'http://localhost:8000'
async function httpGetPlanets() {
  // TODO: Once API is ready.
  const response = await fetch("/planets");
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  
  const response = await fetch("/launches");
  const launched = await response.json();
  // Load launches, sort by flight number, and return as JSON.
  return launched.sort((a, b) => {
    return a.flightNumber - b.flightNumber
  })
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  try{
  return await fetch("launches", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  // Submit given launch data to launch system.
  body: JSON.stringify(launch),
    });
  }catch(err){
    return {
      ok: false,
    }
  }
  
  
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  try{
    return await fetch(`/launches/${id}`, {
    method: "delete"
  })
}catch(err){
  return{
    ok: false
  }
}
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
const API_URL = 'http://localhost:8000'
async function httpGetPlanets() {
  // TODO: Once API is ready.
  const response = await fetch("http://localhost:8000/planets");
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  
  const response = await fetch(`${API_URL}/launches`);
  const launched = await response.json();
  // Load launches, sort by flight number, and return as JSON.
  return launched.sort((a, b) => {
    return a.flightNumber - b.flightNumber
  })
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  try{
  return await fetch(`${API_URL}/launches`, {
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
    return await fetch(`${API_URL}/launches/${id}`, {
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
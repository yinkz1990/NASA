const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { mongooseConnection, mongoooseDisconnect } =  require("../../services/mongo");


describe("LAUNCH API", () => {
    
   beforeAll(async () => {
        await mongooseConnection();
    })   
   
    afterAll(async () => {
        await mongoooseDisconnect();
   })

   
   describe("GET/launches", () => {
    
    test("It should passed with 200 statusCode", async () => {
     const response = await request(app)
     .get("/launches")
     .expect("Content-Type", /json/)
     .expect(200)
     

    })
})

describe("POST/Launches", () => {
    test("It should pass with 201 statusCode", async () => {
       const response = await request(app)
       .post("/launches")
       .send({
           mission : "Kepler",
           rocket : "NASA VTP",
           target: "Kepler-296 f",
           launchDate: "January 4, 2030"
       })
       .expect(201)
       
    })

   test("Should compare the error", async () => {
       const response = await request(app)
       .post("/launches")
       .send({
        mission : "Kepler",
        rocket : "NASA VTP",
        target: "Kepler-296 f",
        launchDate: "Hello"
       })
       .expect(400);
        expect(response.body).toStrictEqual({
        error: "Invalid date"
    })
      
   })
})
    })


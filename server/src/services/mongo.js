const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



mongoose.connection.once("open", () => {
    console.log("Connection ready!");
})

mongoose.connection.on("error", (err) => {
    console.error(err);
})

async function mongooseConnection(){
    await mongoose.connect("mongodb+srv://Olayinka:idumu_1990@cluster0.axjfq.mongodb.net/nasa?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
    })
}

async function mongoooseDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongooseConnection,
    mongoooseDisconnect
}
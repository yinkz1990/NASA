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
    await mongoose.connect(process.env.MONGODB_DATABASE, {
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
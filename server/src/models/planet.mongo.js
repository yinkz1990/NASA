const mongoose = require('mongoose');

const { Schema } = mongoose;


planetSchema = new Schema({
    KeplerName : {
        type : String,
        required: true
    }
});


module.exports = mongoose.model("Planet", planetSchema);
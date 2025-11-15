const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email : {
        type : String,
        lowercase : true,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    dob : {
        type : Date,
        required : true
    },
    number : {
        type : String,
        required:true,
    },
    company : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true
    },
    experience : {
        type : String,
        required : true
    }
})

const data_model = mongoose.model("todo",schema);

module.exports = data_model
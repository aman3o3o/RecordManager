// package import
let express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
let cors = require("cors");

// file import
let { loginsetup } = require("./dbConnect/loginConnection");
const { dataroutes, userroutes, tokenroutes, passwordroutes } = require("./routes/routes");

// middleware
app.use(express.json());
app.use(cors());

// todo routes
app.use("/api",dataroutes);

// user routes
app.use("/api",userroutes);

// token routes
app.use("/api",tokenroutes);

// password routes
app.use("/api",passwordroutes);

// wrong url middleware
app.use((req, res, next) => {
    return res.status(404).json({
        message: "Url not found"
    })
})

// server and database connection
const start_server = async () => {
    try {
        await mongoose.connect(process.env.DATA_STORE);
        console.log("user database is connected to mongoose")
        app.listen(process.env.DATA_PORT, () => {
            console.log(`server is listening at port ${process.env.DATA_PORT}`)
        })
    }
    catch (err) {
        console.log("server / database connection error");
        console.log(err);
    }
}

start_server();



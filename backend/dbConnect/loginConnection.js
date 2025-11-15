const mongoose = require("mongoose");

const loginsetup = () => {
    const loginConnection = mongoose.createConnection(process.env.LOGIN_STORE);

    loginConnection.on("connected", () => {
        console.log("signup database connected");
    })

    loginConnection.on("error", (err) => {
        console.log("signup database connection error - ");
        console.log(err);
    })

    return loginConnection;
}

module.exports = { loginsetup }

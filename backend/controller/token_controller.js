const data_model = require("../model/data_model/data_model");
const jwt = require("jsonwebtoken");

let tokenvalidate = async (req, res) => {
    try {
        let token = req.headers.authorization;
        let decode = jwt.verify(token, process.env.JWTSECRET);
        let result = await data_model.findOne({ email: decode.email });
        if (!result) {
            return res.status(200).json({
                message: `Welcome user`,
                success: true
            })
        }
        return res.status(200).json({
            message: `welcome ${result.name}`,
            success: true
        })
    }
    catch (err) {
        console.log("tokenvalidate error -");
        console.log(err.response);
        return res.status(500).json({
            message: err.message,
            name: err.name
        })
    }
}

module.exports = {tokenvalidate};
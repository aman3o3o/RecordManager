const jwt = require("jsonwebtoken");
const util = require("util");

const tokenValidate = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        let verifyAsync = util.promisify(jwt.verify);
        let decode = await verifyAsync(token, process.env.JWTSECRET);
        console.log("decode value -");
        console.log(decode);
        req.details = decode;
        next();
    }
    catch (err) {
        console.log("tokenValidate error -");
        console.log(err);
        return res.status(500).json({
            message: err.message,
            name: err.name
        })
    }
}

module.exports = { tokenValidate };
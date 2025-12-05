const data_model = require("../model/data_model/data_model");
const user_model = require("../model/user_model/user_model");
const { data_validate } = require("../validation/user_validation");

let datafetch = async (req, res) => {
    try {
        let email = req.details.email;
        let data = await data_model.find({ email: email });
        let signup_data = await user_model.findOne({ email });
        if (data.length === 0) {
            return res.status(200).json({
                message: "Data not found",
                success: true,
                data: data,
                name: signup_data.name,
                email: signup_data.email
            })
        }
        return res.status(200).json({
            success: true,
            message: "data loaded successfully",
            data: data,
            name: signup_data.name,
            email: signup_data.email
        })
    }
    catch (err) {
        console.log("data/fetchData error - ");
        console.log(err);
        return res.status(500).json({
            message: err.message,
            name: err.name
        })
    }
}

let datainsert = async (req, res) => {
    try {
        let email = req.details.email;
        let { country, state, number, dob, experience, salary, company, designation } = req.body;
        let fields = { country, state, number, dob, experience, salary, company, designation, email };
        await data_validate.validateAsync(fields);
        let data = new data_model(fields);
        await data.save();
        return res.status(200).json({
            message: "data added successfully",
            success: true
        })
    }
    catch (err) {
        console.log("data/insert error - ");
        console.log(err);
        return res.status(500).json({
            message: err.message,
            name: err.name
        })
    }
}

let dataupdate = async (req, res) => {
    try {
        let { id } = req.params;
        let { country, state, number, dob, experience, salary, company, designation } = req.body;
        let data = { country, state, number, dob, experience, salary, company, designation };
        let result = await data_model.updateOne({ _id: id }, { $set: data });
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                message: "data updated successfully",
                success: true
            })
        }
        else {
            return res.status(200).json({
                message: "data updated successfully",
                success: true
            })
        }
    }
    catch (err) {
        console.log("data/update error - ");
        console.log(err);
        return res.status(500).json({
            message: err.message,
            name: err.name
        })
    }
}

let datadelete = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await data_model.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            return res.status(200).json({
                message: "data deleted successfully",
                success: true
            })
        }
    }
    catch (err) {
        console.log("data/delete error - ");
        console.log(err);
        return res.status(500).json({
            message: err.message,
            name: err.name
        })
    }
}

// const datafetchE = async (req,res) => {
//     try{
//         console.log("req.body",req.body);
//         let {email} = req.body;
//         let email_check = await user_model.findOne({email});
//         if(!email_check){
//             return res.status(404).json({
//                 message : "email not exist"
//             })
//         }
//         let data = await data_model.find({email});
//         return res.status(200).json({
//             success : true,
//             message : "data loaded successfully",
//             data : data,
//             name : email_check.name,
//             email : email_check.email
//         })
//     }
//     catch(err){
//         console.log("datafetchE error -");
//         console.log(err);
//         return res.status(500).json({
//             message : err.message,
//             name : err.name
//         })
//     }
// }

let datafetchE = async (req,res) => {
    try{
        let {email} = req.params;
        data = await data_model.find({email});
        result = await user_model.findOne({email});
        name = result.name
        return res.status(200).json({
            data : data,
            success : true,
            name : name,
            email : email
        })
    }
    catch(err){
        console.log("datafetch/email error -");
        console.log(err);
        return res.status(500).json({
            message : err.message,
            name : err.name
        })
    }
}
module.exports = { datafetch, datainsert, dataupdate, datadelete , datafetchE}
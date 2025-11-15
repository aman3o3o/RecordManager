const data_model = require("../model/data_model/data_model");
const { data_validate } = require("../validation/user_validation");

let datafetch = async (req, res) => {
    try {
        let {email} = req.params;
        let data = await data_model.find({email : email});
        if (data.length === 0) {
            return res.status(200).json({
                message: "Data not found",
                success: true,
                data: data
            })
        }
        return res.status(200).json({
            success: true,
            message: "data loaded successfully",
            data: data
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
        let {email} = req.params;
        let { country,state,number,dob,experience,salary,company,designation} = req.body;
        let fields = { country,state,number,dob,experience,salary,company,designation ,email};
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
        let { country,state,number,dob,experience,salary,company,designation } = req.body;
        let data = { country,state,number,dob,experience,salary,company,designation };
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
module.exports = { datafetch, datainsert, dataupdate, datadelete }
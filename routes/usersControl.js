var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get("/slot/", async (req, res) => {
    var criObj={}
    var records = await BookingModel.find(criObj);
    res.send(records);
})

router.get("/user/", async (req, res) => {
    var criObj={}
    var records = await usersModel.find(criObj).select({ "name": 1, "username": 1});
    console.log(records)
    res.send(records);
})

router.get("/user/:id", async (req, res) => {
    console.log('inside id search')
    var id = req.params.id;
    var records = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        records = await usersModel.findOne({ _id: id });
    }
    if (records == null) {
        return res.status(404).send({ message: "ID not found" })
    }
    res.send(records);
})


router.post("/user", async (req, res) => {
    console.log('posting a new user')
    var body = req.body;
    var obj = {
        username: body.name,
        password: body.password,
        name:body.name,
        email:body.email,
        address:body.address,
        token:'',
        token_expiry:+0,
        isActive:Boolean(body.isActive),
        Admission_date:Date.now(),
        current_class:body.current_class,
        designation:body.designation,
        created_at:Date.now()
    }

    console.log(obj)
    var insertObj = new usersModel(obj);
    var result = await insertObj.save();
    console.log("result::::", result)
    res.send({ message: "record inserted", id: result._id })
    //res.send({message:"posting..."})
});


router.put("/user/:id", async (req, res) => {
    console.log('modify a new user')
    var id=req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        records = await usersModel.findOne({ _id: id });
    }
    if (records == null) {
        return res.status(404).send({ message: "ID not found" })
    }

    res.send({message:"put method",id})
});



module.exports=router

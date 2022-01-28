var express=require("express");
var router=express.Router();
var mongoose = require('mongoose');
//const { text } = require("body-parser");
var selectedDate=0

var timeArray=["S11","S12","S13","S14"]
var timeArray3=[{}]

router.get("/", async (req, res) => {
    console.log('inside user get method')
//    var userDate=req.query.date
//
    var criObj = {};
    var date=req.query.date||req.body.date
    var location=req.query.location||req.body.location

    if (date) {
        console.log(date)
        criObj.date = date;
        criObj.location=location;
        selectedDate= date;
    }
    var records = await BookingModel.find(criObj);
    var timeArray2=[
        {time:"09.00-10.00",timeString:"09.00-10.00",price:50},
        {time:"10.00-11.00",timeString:"10.00-11.00",price:50},
        {time:"11.00-12.00",timeString:"11.00-12.00",price:50},
        {time:"12.00-13.00",timeString:"12.00-13.00",price:50},
        {time:"13.00-14.00",timeString:"13.00-14.00",price:50},
        {time:"14.00-15.00",timeString:"14.00-15.00",price:50}
    ]

    console.log(records)
    for(var i = 0; i < records.length; i++) {
        var obj = records[i];
        console.log(obj.id);
    }
    records.forEach(async element => {
        console.log(element.time)
        //I was trying to declare timeArray2.  but it is not allowing

        timeArray2 = timeArray2.filter(function (e) {
        return e.time !== element.time;
        });
        
    });
    timeArray3=timeArray2
    res.send(timeArray2);
})

router.post("/",async(req,res)=>{
    var body=req.body
    console.log('checking the posting in booking.js')
    console.log(timeArray3)
    console.log(body)
    var timeArray4=timeArray3
    timeArray4 = timeArray4.filter(function (e) {
        return e.time == body.time;
        });
    
    //timeArray4.push({date:selectedDate})
    var obj={location: body.location,
        date:selectedDate,
        time:body.time,
        status:"booked"}
    console.log(timeArray4[0].time)
    var insertObj = new BookingModel(obj);
    var result = await insertObj.save();
    console.log("result::::")
    res.send({ message: "record inserted", id: result._id })


})

module.exports=router
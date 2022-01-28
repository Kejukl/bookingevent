const express = require('express');
const app = express();

var bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true})); // app.use(bodyParser.urlencoded)
app.use(bodyParser.json())
const cors=require("cors")
app.use(cors({origin:"*"}))
var session = require('express-session')
var sess = {
    secret: 'keja',
    cookie: {
        proxy: true,
        resave: true,
        saveUninitialized: true,
        secure: 'auto',
        SameSite: 'None'
    }
  }
  app.use(session(sess))


require("./models/db.js")
require("./models/pay.js")


var AuthRouter=require("./routes/auth.js")
app.use("/auth",AuthRouter)
//
var usersControlRouter=require("./routes/usersControl.js")
app.use("/Admin",checkLoggedIn,checkUserLevel,usersControlRouter)
//
var paypalRouter=require("./routes/paypal.js");
const { PromiseProvider } = require('mongoose');
app.use("/pay",paypalRouter)
//
var bookingRouter=require("./routes/booking.js")
app.use("/booking",checkLoggedIn,bookingRouter)

app.use(express.static('public'));
app.use("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.listen(5000, () => {
    console.log(__dirname)
    console.log("Express server running in 5000")
})


async function checkLoggedIn(req,res,next){
    //var token=req.header('Authorisation');
    console.log('Checking auth')
    var token=req.query.token||req.body.token;
    if(!token){
        res.status(401).send('not authenticated')
    }
    var timenow=Date.now();
    var loggedIn=await usersModel.find({token:token,token_expiry:{"$gt":timenow}})
    console.log('line 23',token);
    if (loggedIn.length){
        req.user=loggedIn[0]
        next()
    }else{
        res.status(401).send({message:'not authenticated'})
    }
}

async function checkUserLevel(req,res,next){
    console.log("In check level")
    console.log(req.user.designation)
    userLevel=req.user.designation
    if(userLevel=="Head"){
        console.log('user is Head and accessing user data')
        next()
    }else{
        res.status(402).send({message:'not authenticated'})
    }
}
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/tuscan", { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false})
    .then((data) => { console.log("DB connected") })
	.catch(error => { console.log(error) });
	
var usersSchema = mongoose.Schema({
	username: String,
	password:String,
	name: String,
	email:String,
	address:String,
	phone:String,
	token:String,
	token_expiry:Number,
	isActive: Boolean,
	Admission_date:String,
	current_class:String,
	designation:String,
	created_at:Date}, { collection: "users_master_v2" });	

var bookingSchema=mongoose.Schema({
	location: String,
	date:Number,
	time:String,
	status:String
},{ collection: "slots" })

global.usersModel=mongoose.model("users_master_v2",usersSchema)
global.BookingModel=mongoose.model("slots",bookingSchema)
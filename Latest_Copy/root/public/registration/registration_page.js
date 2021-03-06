var express = require('express');
var router = express.Router();

// for hashing/verifying hashed passwords
var hash = require('password-hash');

// for reading HTML body data
var bodyParser = require('body-parser');
var multer = require('multer'); 
var multiform = multer();

var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
	_id: String,
    lab: String, 
    password: String, 
    email: String,
    classification: String,
    phone: String,
    r: String,
    labsafety: String,
    hazzardcommunication: String,
    safetyawareness: String,
    teacher: String, 
    budget: Number
});

var account = mongoose.model('registration', accountSchema, 'accounts'); // 'name', Schema, 'collection' -> format used in order to have access to a collection while avoiding same-schema issues

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(multiform.array());


router.get('', function(req, res){ // no url since navigation.js takes care of /registration
	res.sendFile(__dirname + '/registration_page.html');
});

router.post('', function(req,res){
	
	
	var userInfo = req.body;
	
	var hashedpassword = hash.generate(userInfo.password, [saltLength = 20]);
	
	// Setting up new entry for new user using the 'account' Schema created above
	var newAccount = new account({
		_id: userInfo.full_name,
		email: userInfo.email,
		r: userInfo.r_number, 
		password: hashedpassword,
		lab: null,
		labsafety: null,
		hazzardcommunication: null,
		safetyawareness: null,
		teacher: null, 
		budget: null,
		phone: userInfo.phone,
		classification: null
	});
	//handle if the re-enter password is wrong
	
	console.log("Attempted User Creation By: " + userInfo.full_name); 


	newAccount.save(function(err){
		
		if(err){
			console.log(err);
			return res.send("Error In User Creation By: " + userInfo.full_name); // must use return to respond to the .post
		}
		else{
			console.log("Account Entry Successful By: " + userInfo.full_name);
			return res.redirect('/'); //redirect to login page
		}
	});
	
});


module.exports = router;
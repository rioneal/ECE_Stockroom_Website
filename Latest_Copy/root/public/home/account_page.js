var express = require('express'); 
var account = express.Router(); 

// for reading HTML body data
var bodyParser = require('body-parser');
var multer = require('multer'); 
var multiform = multer();

var mongoose = require('mongoose');

account.get('', function(req, res){
	res.sendFile(__dirname + '/account_page.html');
});


module.exports = account; 
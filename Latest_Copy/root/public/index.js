// This .js file is used to handle all routing through the website. 
// Each and every page visitable on the website will be listed here for specific routing to their respective .js files. 
// This will ensure that everything is kept organzied and each specific function of the website is correlated with its' respective .js file. 

var express = require('express'); 
var index = express.Router();


var login = require(__dirname + "/login/login.js");
var equipment = require(__dirname + "/management/equipment.js");
var registration = require(__dirname + "/registration/registration_page.js");
var accountpage = require(__dirname + "/home/account_page.js");


index.use('', login); 
index.use('/management', equipment); // temporary for equipment
index.use('/registration', registration);
index.use('/home/account_page', accountpage);


module.exports = index;

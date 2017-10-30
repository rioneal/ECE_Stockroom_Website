var express = require('express');
var server = express();


//database connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Stockroom'); // only one connection needed to the database


var index = require(__dirname + '/public/index.js'); // for routing all the pages

//server.use(express.static(__dirname + '/public')); // delivering the HTML pages

server.use(express.static(__dirname + '/public/images')); // delivering the images on HTML pages

server.use('', index); // routes all trafic to the index.js file for specific routing (just used to keep things organized)

server.listen(80); 

module.exports = server; 
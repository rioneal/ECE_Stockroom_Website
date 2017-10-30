var express = require('express');
var equipmentRouter = express.Router();


var bodyParser = require('body-parser');
var multer = require('multer'); 
var multiform = multer();

console.log(__dirname);


var mongoose = require('mongoose');

/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Stockroom');
*/

var equipmentSchema = mongoose.Schema({
	_id: String,
	owner: String, 
	description: String
});


var equipment = mongoose.model("equipment", equipmentSchema);

equipmentRouter.use(bodyParser.json());
equipmentRouter.use(bodyParser.urlencoded({extended: true}));
equipmentRouter.use(multiform.array());

equipmentRouter.get('/addequipment', function(req, res){
	res.sendFile(__dirname + '/addequipment.html');
});

equipmentRouter.post('/addequipment', function(req,res){
	var equipmentInfo = req.body; 
	
	
	var newEquipment = new equipment({
		_id: equipmentInfo.equip_entry, 
		description: equipmentInfo.equip_description, 
		owner: null
	});
	
	
	newEquipment.save(function(err, res){
		if(err)
		{
			console.log(err); 
		}
		else
		{
			console.log("equipment added successfully");
		}
	});
	return res.redirect("/management/addequipment");
});

module.exports = equipmentRouter; 
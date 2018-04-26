var csv = require('csvtojson');
var w = require('./../utility/write');
var firstnames = require('./../raw/firstnames.json');
var lastnames = require('./../raw/lastnames.json');

module.exports = function(){
	var formatted_data = {
		firstnames: [],
		lastnames: [],
	};

	for(var i=0; i<firstnames.length; i++)
		formatted_data.firstnames.push(firstnames[i]["firstname"]);	
	for(var i=0; i<lastnames.length; i++)
		formatted_data.lastnames.push(lastnames[i]["lastname"]);	


	w("./names.json", JSON.stringify(formatted_data));
	console.log(formatted_data);
}

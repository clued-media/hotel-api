var data = require('./../raw/hotels_usa.json');
var w = require('./../utility/write');
var facilities = require('./../facilities.json');

module.exports = function(){
	var formatted_data = {};
	var id = 1;
	data["data"].forEach(function(entry){
		var name = entry[8];
		var addr = entry[9];

		if(name != addr) {
			formatted_data[id] = {
				name: name,
				address: {
					city: "New Orleans",
					street: addr,
					country: "USA",
					state: "Louisiana"
				},
				users: [],
				rooms: [],
				boookings: [],
				payments: [],
				reviews: [],
				facilities: [],
				media: []
			}
			formatted_data[id]["facilities"][0] = id;
			formatted_data[id]["facilities"][1] = id-1;
		}

		id++;
	})
	w("./hotels.json", JSON.stringify(formatted_data));
}

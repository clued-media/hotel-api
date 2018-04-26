var data = require('./../raw/hotels_usa.json');
var w = require('./../utility/write');

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
		}
	})

	w("./hotels.json", JSON.stringify(formatted_data));

	console.log(formatted_data);
}

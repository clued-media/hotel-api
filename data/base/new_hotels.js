var data1 = require('./../raw/hotels_usa.json');
var data2 = require('./../raw/hotels_usa_2.json');
var w = require('./../utility/write');
var facilities = require('./../facilities.json');

module.exports = function(){
	var all_hotels = [];
	var id = 0;
	data1["data"].forEach(function(entry){
		var formatted_data = {};
		var name = entry[8];
		var addr = entry[9];

		if(name != addr) {
			formatted_data = {
				name: name,
				id: id,
				location: id,
				users: [],
				facilities: [],
				rooms: [],
				bookings: [],
				payments: [],
				reviews: [],
				media: []
			}
			formatted_data["users"][0] = id;
			formatted_data["users"][1] = id+600;
			formatted_data["users"][2] = id+300;
			formatted_data["payments"][0] = id;
			formatted_data["payments"][1] = id+600;
			formatted_data["payments"][2] = id+300;
			formatted_data["facilities"][0] = id;
			formatted_data["facilities"][1] = id-1;
			formatted_data["reviews"][0] = id;
			formatted_data["rooms"][0] = id;
			formatted_data["rooms"][1] = id+1;
			formatted_data["media"][0] = id%5;
			formatted_data["bookings"][0] = id;
		
			all_hotels.push(formatted_data);
			id++;
		}
	})

	data2.forEach(function(entry){
		var formatted_data = {};
	
		formatted_data = {
			name: entry.name,
			id: id,
			location: (id-346),
			users: [],
			facilities: [],
			rooms: [],
			bookings: [],
			payments: [],
			reviews: [],
			media: []
		}
		formatted_data["users"][0] = id;
		formatted_data["users"][1] = id+600;
		formatted_data["users"][2] = id+300;
		formatted_data["payments"][0] = id;
		formatted_data["payments"][1] = id+600;
		formatted_data["payments"][2] = id+300;
		formatted_data["facilities"][0] = id;
		formatted_data["facilities"][1] = id-1;
		formatted_data["reviews"][0] = id;
		formatted_data["rooms"][0] = id;
		formatted_data["rooms"][1] = id+1;
		formatted_data["media"][0] = id%5;
		formatted_data["bookings"][0] = id;
	
		all_hotels.push(formatted_data);
		id++;
	})


	w("./hotels.json", JSON.stringify(all_hotels));
}

var w = require('./../utility/write');
var data = require('./../raw/hotels_usa_2.json');

module.exports = function(){
	var all_locations = [];
	var id = 0;
	data.forEach(function(entry){
		var formatted_data = {};
		formatted_data = {
			id: id,
			longitude: entry.longitude,
			latitude: entry.latitude,
			city: entry.city,
			country: entry.country,
			country_code: "USA"
		}
		all_locations.push(formatted_data);
		id++
	})
	w("./locations.json", JSON.stringify(all_locations));
}

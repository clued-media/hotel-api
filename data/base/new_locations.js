var w = require('./../utility/write');

module.exports = function(){
	var all_locations = [];
	var id;
	for(id=0; id<999; id++){
		var formatted_data = {};
		formatted_data = {
			id: id,
			name: "location x",
			longitude: 0.0,
			latitude: 0.0,
			city: "",
			country: "",
			country_code: ""
		}
		all_locations.push(formatted_data);
	}
	w("./locations.json", JSON.stringify(all_locations));
}

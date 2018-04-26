var w = require('./../utility/write');

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			name: "location x",
			longitude: 0.0,
			latitude: 0.0,
			city: "",
			country: "",
			country_code: ""
		}

	}
	w("./locations.json", JSON.stringify(formatted_data));
}

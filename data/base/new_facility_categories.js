var w = require('./../utility/write');
module.exports = function(){
	var formatted_data = {};

	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			name: "category x",
		}

	}
	w("./facility_categories.json", JSON.stringify(formatted_data));
}

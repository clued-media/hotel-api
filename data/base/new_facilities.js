var w = require('./../utility/write');
var ft = require('./../facility_categories.json');

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			name: "facility x",
			category_id: id%6
		}
	}
	w("./facilities.json", JSON.stringify(formatted_data));
}

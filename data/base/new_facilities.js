var w = require('./../utility/write');
var ft = require('./../facility_categories.json');

module.exports = function(){
	var all_facilities = [];
	var id;
	for(id=0; id<999; id++){
		var formatted_data = {};
		formatted_data = {
			id: id,
			name: ft[id%13]["name"],
			category_id: id%13
		}
		all_facilities.push(formatted_data);
	}
	w("./facilities.json", JSON.stringify(all_facilities));
}

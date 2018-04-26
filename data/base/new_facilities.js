var w = require('./../utility/write');

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			name: "facility x",
			category_id: -1,
		}
	}

	w("./facilities.json", JSON.stringify(formatted_data));

	console.log(formatted_data);
}

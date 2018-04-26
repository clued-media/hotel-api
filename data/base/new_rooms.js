var w = require('./../utility/write');

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			room_no: Math.floor(id/6),
			description: ".. descriptive text ..",
			category: ".. descriptive text ..",
			facilities: [],
			size: (-1).toFixed(2),
			capacity: -1,
			price: (-1).toFixed(2),
		}
	}
	w("./rooms.json", JSON.stringify(formatted_data));
}

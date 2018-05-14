var w = require('./../utility/write');

module.exports = function(){
	var all_rooms = [];
	var id;
	for(id=0; id<999; id++){
		var formatted_data = {};
		formatted_data = {
			id: id,
			room_no: Math.floor(id/6),
			description: ".. descriptive text ..",
			category: ".. descriptive text ..",
			facilities: [],
			size: (-1).toFixed(2),
			capacity: -1,
			price: (-1).toFixed(2),
		}
		all_rooms.push(formatted_data);
	}
	w("./rooms.json", JSON.stringify(all_rooms));
}

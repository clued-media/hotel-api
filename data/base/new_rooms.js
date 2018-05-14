var w = require('./../utility/write');

module.exports = function(){
	var all_rooms = [];
	var id;
	for(id=0; id<999; id++){
		var formatted_data = {};
		formatted_data = {
			id: id,
			room_no: Math.floor(id/6),
			description: "awesome room",
			category: "awesome",
			size: (Math.floor(Math.random()*55) + 15).toFixed(2),
			capacity: (Math.floor(Math.random()*6) + 1),
			price: (Math.floor(Math.random()*200) + 20).toFixed(2),
		}
		all_rooms.push(formatted_data);
	}
	w("./rooms.json", JSON.stringify(all_rooms));
}

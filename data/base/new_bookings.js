var w = require('./../utility/write');

module.exports = function(){
	var all_bookings = []
	var id;
	for(id=0; id<999; id++){
		var formatted_data = {};
		formatted_data = {
			id: id,
			date: new Date(),
			arrival_date: new Date(),
			departure_date: new Date(),
			user_id: -1,
			rooms: [],
		}
		all_bookings.push(formatted_data);
	}
	w("./bookings.json", JSON.stringify(all_bookings));
}

var w = require('./../utility/write');

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			date: new Date(),
			arrival_date: new Date(),
			departure_date: new Date(),
			user_id: -1,
			rooms: [],
		}

	}

	w("./bookings.json", JSON.stringify(formatted_data));

	console.log(formatted_data);
}

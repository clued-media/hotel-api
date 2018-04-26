var w = require('./../utility/write');

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		formatted_data[id] = {
			username: "JoDo_" + id,
			first_name: "John",
			last_name: "Doe",
			email: "JoDo_" + id + "@email.net",
			bookings: [],
			payments: [],
			reviews: [],
		}

	}

	w("./users.json", JSON.stringify(formatted_data));

	console.log(formatted_data);
}

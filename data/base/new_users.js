var w = require('./../utility/write');
var names = require('./../names.json');
var firstnamecount = names.firstnames.length;
var lastnamecount = names.lastnames.length;

module.exports = function(){
	var formatted_data = {};
	var id;
	for(id=0; id<999; id++){
		var firstnameid = Math.floor(Math.random()*firstnamecount);
		var lastnameid = Math.floor(Math.random()*lastnamecount);

		var firstname = names.firstnames[firstnameid];
		var lastname = names.lastnames[lastnameid];

		formatted_data[id] = {
			first_name: firstname,
			last_name: lastname,
			username: firstname + lastname,
			email: firstname + lastname + "@email.net",
			bookings: [],
			payments: [],
			reviews: [],
		}

	}

	w("./users.json", JSON.stringify(formatted_data));
}

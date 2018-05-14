var w = require('./../utility/write');
var names = require('./../raw/names.json');
var passwords = require('./../raw/passwords.json');
var firstnamecount = names.firstnames.length;
var lastnamecount = names.lastnames.length;

module.exports = function(){
	var all_users = [];
	var id;
	for(id=0; id<999; id++){
		var formatted_data = {};
		var firstnameid = Math.floor(Math.random()*firstnamecount);
		var lastnameid = Math.floor(Math.random()*lastnamecount);

		var firstname = names.firstnames[firstnameid];
		var lastname = names.lastnames[lastnameid];

		formatted_data = {
			id: id,
			first_name: firstname,
			last_name: lastname,
			username: firstname + lastname,
			email: firstname + lastname + "@email.net",
			password: passwords[id*2]["password"],
			reviews: [],
			bookings: [],
			payments: [],
		}
		formatted_data["reviews"][0] = id*34;
		formatted_data["bookings"][0] = id;
		formatted_data["payments"][0] = id; 
		all_users.push(formatted_data);

	}
	w("./users.json", JSON.stringify(all_users));
}

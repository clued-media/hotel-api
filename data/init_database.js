/*
var fs = require('fs');
var mod_path = './base/';

fs.readdirSync(mod_path).forEach(file => {
	var module = require(mod_path + file);
	module();
})
*/

/*
bookings = require('./base/new_bookings');
bookings();
hotels = require('./base/new_hotels');
hotels();
*/
rooms = require('./base/new_rooms');
rooms();
/*
locations = require('./base/new_locations');
locations();
payments = require('./base/new_payments');
payments();
users = require('./base/new_users');
users();
media = require('./base/new_media');
media();
reviews = require('./base/new_reviews');
reviews();
*/

/* do not use these as we're done with them */
/*
facilities = require('./base/new_facilities');
facilities();
names = require('./base/new_names');
names();
*/

/*
var fs = require('fs');
var mod_path = './base/';

fs.readdirSync(mod_path).forEach(file => {
	var module = require(mod_path + file);
	module();
})
*/

// FIXME: user data set relies on this so they have to be executed seperately
names = require('./base/new_names');
names();
/*
bookings = require('./base/new_bookings');
bookings();
hotels = require('./base/new_hotels');
hotels();
rooms = require('./base/new_rooms');
rooms();
facilities = require('./base/new_facilities');
facilities();
locations = require('./base/new_locations');
locations();
payments = require('./base/new_payments');
payments();
users = require('./base/new_users');
users();
facility_categories = require('./base/new_facility_categories');
facility_categories();
media = require('./base/new_media');
media();
reviews = require('./base/new_reviews');
reviews();
*/

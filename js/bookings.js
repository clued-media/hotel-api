'use strict';

module.exports = function(app) {

	var uri = '/bookings';

	app.get(uri, function(req, res) {
		res.send('TEST GET');
	});

	app.put(uri, function(req, res) {
		res.send('TEST PUT!');
	});

	app.post(uri, function(req, res) {
		res.send('TEST POST!');
	});

	app.delete(uri, function(req, res) {
		res.send('TEST DELETE!');
	});

};

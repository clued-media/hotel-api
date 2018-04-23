'use strict';

module.exports = function(app) {

	var uri = '/hotels';

	app.get(uri, function(req, res) {
		res.send(JSON.stringify(app.prototype.hotels));
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

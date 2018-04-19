'use strict';

module.exports = function(app) {

	app.get('/hotels', function(req, res) {
		res.send('TEST GET');
	});

	app.put('/hotels', function(req, res) {
		res.send('TEST PUT!');
	});

	app.post('/hotels', function(req, res) {
		res.send('TEST POST!');
	});

	app.delete('/hotels', function(req, res) {
		res.send('TEST DELETE!');
	});

};

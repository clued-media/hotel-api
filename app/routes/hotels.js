'use strict';

var router = require('../components/router');

function Hotels() {
  var dbc = require('../components/db_client')('hotels');
  var hotels = router(dbc);

  hotels.get('/:id/users', (req, res, next) => {
    res.send(dbc.find(req.params.id)['users']);
    next();
  });

  hotels.get('/:id/rooms', (req, res, next) => {
    res.send(dbc.find(req.params.id)['rooms']);
    next();
  });

  hotels.get('/:id/bookings', (req, res, next) => {
    res.send(dbc.find(req.params.id)['bookings']);
    next();
  });

  hotels.get('/:id/reviews', (req, res, next) => {
    res.send(dbc.find(req.params.id)['reviews']);
    next();
  });

  hotels.get('/:id/facilities', (req, res, next) => {
    res.send(dbc.find(req.params.id)['facilities']);
    next();
  });

  hotels.get('/:id/media', (req, res, next) => {
    res.send(dbc.find(req.params.id)['media']);
    next();
  });

  return hotels;
}

module.exports = Hotels();
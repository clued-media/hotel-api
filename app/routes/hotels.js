'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Hotels() {
  var dbc = require('../components/db_client')('hotels');
  var hotels = router(dbc);

  hotels.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'Hotel');
    json['location'] = entry.location;
    json['users'] = req.originalUrl + '/users';
    json['rooms'] = req.originalUrl + '/rooms';
    json['bookings'] = req.originalUrl + '/bookings';
    json['reviews'] = req.originalUrl + '/reviews';
    json['facilities'] = req.originalUrl + '/facilities';
    json['media'] = req.originalUrl + '/media';

    res.send(json);
    next();
  });

  hotels.get('/:id/users', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl, dbc.find(req.params.id)['users']
    ));
    next();
  });

  hotels.get('/:id/rooms', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl, dbc.find(req.params.id)['rooms']
    ));
    next();
  });

  hotels.get('/:id/bookings', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl, dbc.find(req.params.id)['bookings']
    ));
    next();
  });

  hotels.get('/:id/reviews', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl, dbc.find(req.params.id)['reviews']
    ));
    next();
  });

  hotels.get('/:id/facilities', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl, dbc.find(req.params.id)['facilities']
    ));
    next();
  });

  hotels.get('/:id/media', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl, dbc.find(req.params.id)['media']
    ));
    next();
  });

  return hotels;
}

module.exports = Hotels();
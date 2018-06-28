'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');
var handler = require('../components/handler');

var config = require('../../config');

function Hotels() {
  var dbc = require('../components/db_client')('hotels');
  var hotels = router(dbc);

  hotels.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    if (entry) {
      var json = jsonld.createResource(req.originalUrl, 'Hotel');
      json['name'] = entry.name;
      json['location'] = entry.location;
      json['users'] = req.originalUrl + '/users';
      json['rooms'] = req.originalUrl + '/rooms';
      json['bookings'] = req.originalUrl + '/bookings';
      json['reviews'] = req.originalUrl + '/reviews';
      json['facilities'] = req.originalUrl + '/facilities';
      json['media'] = req.originalUrl + '/media';

      res.send(json);
    } else {
      res.status(404).json('Not Found');
    }

    next();
  });

  hotels.post('/', (req, res, next) => {
    req.body.location = config.ns + '/locations/' + req.body.location;
    req.body['users'] = [];
    req.body['rooms'] = [];
    req.body['bookings'] = [];
    req.body['reviews'] = [];
    req.body['facilities'] = [];
    req.body['media'] = [];

    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('Hotel not created successfully');
      next();
    });
  });

  hotels.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    handler.updateHotel(req.body, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.status(500).json('Hotel not updated successfully');
      next();
    });
  });

  hotels.get('/:id/users', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      'User',
      dbc.find(req.params.id)['users']
    ));
    next();
  });

  hotels.get('/:id/rooms', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      'Room',
      dbc.find(req.params.id)['rooms']
    ));
    next();
  });

  hotels.post('/:id/rooms', (req, res, next) => {
    req.body['hotel'] = req.params.id;

    handler.createRoom(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('Room not added successfully');
      next();
    });
  });

  hotels.get('/:id/bookings', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      'Booking',
      dbc.find(req.params.id)['bookings']
    ));
    next();
  });

  hotels.get('/:id/reviews', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      'Review',
      dbc.find(req.params.id)['reviews']
    ));
    next();
  });

  hotels.get('/:id/facilities', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      'Facility',
      dbc.find(req.params.id)['facilities']
    ));
    next();
  });

  hotels.get('/:id/media', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      'Media',
      dbc.find(req.params.id)['media']
    ));
    next();
  });

  hotels.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id)) {
      res.status(200).json('OK');
    } else {
      res.status(500).json('Hotel not deleted successfully');
    }

    next();
  });

  return hotels;
}

module.exports = Hotels();
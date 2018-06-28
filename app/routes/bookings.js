'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');
var handler = require('../components/handler');

var config = require('../../config');

function Bookings() {
  var dbc = require('../components/db_client')('bookings');
  var bookings = router(dbc);

  bookings.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    if (entry) {
      var json = jsonld.createResource(req.originalUrl, 'Booking');
      json['date'] = entry.date;
      json['arrival_date'] = entry.arrival_date;
      json['departure_date'] = entry.departure_date;
      json['payment_method'] = entry.payment_method;
      json['amount'] = entry.amount;
      json['user'] = entry.user;
      json['rooms'] = req.originalUrl + '/rooms';

      res.send(json);
    } else {
      res.status(404).json('Not Found');
    }
    next();
  });

  bookings.post('/', (req, res, next) => {
    req.body.user = config.ns + '/users/' + req.body.user;
    req.body['rooms'] = [];

    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('Booking not created successfully');
      next();
    });
  });

  bookings.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    handler.updateBooking(req.body, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.status(500).json('Booking not updated successfully');
      next();
    });
  });

  bookings.get('/:id/rooms', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      'Room',
      dbc.find(req.params.id)['rooms']
    ));
    next();
  });

  bookings.post('/:id/rooms', (req, res, next) => {
    handler.addRoom(req.params.id, req.body.room, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.status(500).json('Room not added successfully');
      next();
    });
  });

  bookings.delete('/:id/rooms', (req, res, next) => {
    handler.removeRoom(req.params.id, req.body.room, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.status(500).json('Room not removed successfully');
      next();
    });
  });

  bookings.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id)) {
      res.status(200).json('OK');
    } else {
      res.status(500).json('Booking not deleted successfully');
    }

    next();
  });

  return bookings;
}

module.exports = Bookings();
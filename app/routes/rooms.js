'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');
var handler = require('../components/handler');

var config = require('../../config');

function Rooms() {
  var dbc = require('../components/db_client')('rooms');
  var rooms = router(dbc);

  rooms.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    if (entry) {
      var json = jsonld.createResource(req.originalUrl, 'Room');
      json['room_no'] = entry.room_no;
      json['description'] = entry.description;
      json['category'] = entry.category;
      json['size'] = entry.size;
      json['capacity'] = entry.capacity;
      json['price'] = entry.price;
      json['hotel'] = entry.hotel;

      res.send(json);
    } else {
      res.sendStatus(404);
    }

    next();
  });

  rooms.post('/', (req, res, next) => {
    handler.createRoom(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.sendStatus(500);

      next();
    });
  });

  rooms.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;
    req.body.hotel = config.ns + '/hotels/' + req.body.hotel;

    dbc.update(req.body, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.sendStatus(500);
    });

    next();
  });

  rooms.delete('/:id', (req, res, next) => {
    handler.deleteRoom(req.params.id, (roomId) => {
      if (roomId) res.sendStatus(200);
      else res.sendStatus(404);

      next();
    });
  });

  return rooms;
}

module.exports = Rooms();
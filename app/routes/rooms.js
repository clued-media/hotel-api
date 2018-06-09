'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Rooms() {
  var dbc = require('../components/db_client')('rooms');
  var rooms = router(dbc);

  rooms.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'Room');
    json['room_no'] = entry.room_no;
    json['description'] = entry.description;
    json['category'] = entry.category;
    json['size'] = entry.size;
    json['capacity'] = entry.capacity;
    json['price'] = entry.price;
    json['hotel'] = entry.hotel;

    res.send(json);
    next();
  });

  return rooms;
}

module.exports = Rooms();
'use strict';

var router = require('../components/router');
var db = require('../../data/rooms.json');

function Rooms() {
  var dbc = require('../components/db_client')(db);
  var rooms = router(dbc);

  rooms.get('/:id/facilities', (req, res, next) => {
    res.send(dbc.find(req.params.id)['facilities']);
    next();
  });

  return rooms;
}

module.exports = Rooms();
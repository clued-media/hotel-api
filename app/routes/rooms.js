'use strict';

var router = require('../components/router');

function Rooms() {
  var dbc = require('../components/db_client')('rooms');
  var rooms = router(dbc);

  rooms.get('/:id/facilities', (req, res, next) => {
    res.send(dbc.find(req.params.id)['facilities']);
    next();
  });

  return rooms;
}

module.exports = Rooms();
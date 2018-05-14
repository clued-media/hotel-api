'use strict';

var router = require('../components/router');
var db = require('../../data/bookings.json');

function Bookings() {
  var dbc = require('../components/db_client')(db);
  var bookings = router(dbc);

  bookings.get('/:id/rooms', (req, res, next) => {
    res.send(dbc.find(req.params.id)['rooms']);
    next();
  });

  return bookings;
}

module.exports = Bookings();
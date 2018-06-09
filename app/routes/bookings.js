'use strict';

var router = require('../components/router');

function Bookings() {
  var dbc = require('../components/db_client')('bookings');
  var bookings = router(dbc);

  bookings.get('/:id/rooms', (req, res, next) => {
    res.send(dbc.find(req.params.id)['rooms']);
    next();
  });

  return bookings;
}

module.exports = Bookings();
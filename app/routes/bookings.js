'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Bookings() {
  var dbc = require('../components/db_client')('bookings');
  var bookings = router(dbc);

  bookings.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'Booking');
    json['date'] = entry.date;
    json['arrival_date'] = entry.arrival_date;
    json['depature_date'] = entry.depature_date;
    json['payment_method'] = entry.payment_method;
    json['amount'] = entry.amount;
    json['user'] = entry.user;
    json['rooms'] = req.originalUrl + '/rooms';

    res.send(json);
    next();
  });

  bookings.get('/:id/rooms', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl, dbc.find(req.params.id)['rooms']
    ));
    next();
  });

  return bookings;
}

module.exports = Bookings();
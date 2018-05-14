'use strict';

var router = require('../components/router');
var db = require('../../data/users.json');

function Users() {
  var dbc = require('../components/db_client')(db);
  var users = router(dbc);

  users.get('/:id/bookings', (req, res, next) => {
    res.send(dbc.find(req.params.id)['bookings']);
    next();
  });

  users.get('/:id/payments', (req, res, next) => {
    res.send(dbc.find(req.params.id)['payments']);
    next();
  });

  users.get('/:id/reviews', (req, res, next) => {
    res.send(dbc.find(req.params.id)['reviews']);
    next();
  });

  return users;
}

module.exports = Users();
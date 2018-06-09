'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Users() {
  var dbc = require('../components/db_client')('users');
  var users = router(dbc);

  users.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'User');
    json['first_name'] = entry.first_name;
    json['last_name'] = entry.last_name;
    json['username'] = entry.username;
    json['email'] = entry.email;
    json['password'] = entry.password;
    json['bookings'] = req.originalUrl + '/bookings';
    json['reviews'] = req.originalUrl + '/reviews';

    res.send(json);
    next();
  });

  users.get('/:id/bookings', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl, dbc.find(req.params.id)['bookings']
    ));
    next();
  });

  users.get('/:id/reviews', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl, dbc.find(req.params.id)['reviews']
    ));
    next();
  });

  return users;
}

module.exports = Users();
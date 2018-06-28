'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');
var handler = require('../components/handler');

function Users() {
  var dbc = require('../components/db_client')('users');
  var users = router(dbc);

  users.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    if (entry) {
      var json = jsonld.createResource(req.originalUrl, 'User');
      json['first_name'] = entry.first_name;
      json['last_name'] = entry.last_name;
      json['username'] = entry.username;
      json['email'] = entry.email;
      json['password'] = entry.password;
      json['bookings'] = req.originalUrl + '/bookings';
      json['reviews'] = req.originalUrl + '/reviews';

      res.send(json);
    } else {
      res.status(404).json('Not Found');
    }

    next();
  });

  users.post('/', (req, res, next) => {
    req.body['bookings'] = [];
    req.body['reviews'] = [];

    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('User not created successfully');
      next();
    });
  });

  users.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    handler.updateUser(req.body, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.status(500).json('User not updated successfully');
      next();
    });
  });

  users.get('/:id/bookings', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      'Booking',
      dbc.find(req.params.id)['bookings']
    ));
    next();
  });

  users.post('/:id/bookings', (req, res, next) => {
    // Add user id to body.
    req.body['user'] = req.params.id;

    handler.createBooking(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('Booking not created successfully');
      next();
    });
  });

  users.get('/:id/reviews', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      'Review',
      dbc.find(req.params.id)['reviews']
    ));
    next();
  });

  users.post('/:id/reviews', (req, res, next) => {
    // Add user id to body.
    req.body['user'] = req.params.id;

    handler.createReview(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('Review not created successfully');
      next();
    });
  });

  users.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id)) {
      res.sendStatus(200);
    } else {
      res.status(500).json('User not deleted successfully');
    }

    next();
  });

  return users;
}

module.exports = Users();
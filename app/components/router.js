'use strict';

var express = require('express');
var config = require('../../config');
var jsonld = require('./jsonld_factory');

module.exports = dbc => {
  var router = express.Router();

  function _getType(baseUrl) {
    switch (baseUrl) {
      case config.ns + '/users':
        return 'User';
      case config.ns + '/hotels':
        return 'Hotel';
      case config.ns + '/rooms':
        return 'Room';
      case config.ns + '/bookings':
        return 'Booking';
      case config.ns + '/reviews':
        return 'Review';
      case config.ns + '/facilities':
        return 'Facility';
      case config.ns + '/categories':
        return 'Category';
      case config.ns + '/locations':
        return 'Location';
      case config.ns + '/media':
        return 'Media';
      default:
        return 'Nothing';
    }
  };

  router.get('/', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      _getType(req.baseUrl),
      dbc.all()
    ));
    next();
  });

  router.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }

    next();
  });

  return router;
};
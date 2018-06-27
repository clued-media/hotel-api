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

  /* GET REQUESTS */
  router.get('/', (req, res, next) => {
    res.send(jsonld.createCollection(
      req.originalUrl,
      _getType(req.baseUrl),
      dbc.all()
    ));
    next();
  });

  /* POST REQUESTS */
  // router.post('/', (req, res, next) => {
  //   if (dbc.create(req.body)) {
  //     res.status(201).send('Entry created!');
  //   } else {
  //     res.status(500).send('Entry not created!');
  //   }

  //   next();
  // });

  /* PUT REQUESTS */
  // router.put('/', (req, res, next) => {
  //   if (dbc.update(req.body)) {
  //     res.status(200).send('Entry updated!');
  //   } else {
  //     res.status(404).send('Entry not updated!');
  //   }

  //   next();
  // });

  /* DELETE REQUESTS */
  router.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id)) {
      res.status(200).json('Entry deleted!');
    } else {
      res.status(404).json('Entry not deleted!');
    }

    next();
  });

  return router;
};
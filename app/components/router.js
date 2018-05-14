'use strict';

var express = require('express');

module.exports = dbc => {
  var router = express.Router();

  /* GET REQUESTS */
  router.get('/', (req, res, next) => {
    res.send(dbc.all());
    next();
  });

  router.get('/:id', (req, res, next) => {
    res.send(dbc.find(req.params.id));
    next();
  });

  /* PUT REQUESTS */
  router.put('/', (req, res, next) => {
    res.send('TEST PUT!\n');
    next();
  });

  /* POST REQUESTS */
  router.post('/', (req, res, next) => {
    res.send('TEST POST!\n');
    next();
  });

  /* DELETE REQUESTS */
  router.delete('/:id', (req, res, next) => {
    // res.send(dbc.delete(req.params.id));
    res.send('TEST DELETE!\n')
    next();
  });

  return router;
};
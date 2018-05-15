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
    if (dbc.update(req.body))
      res.status(200).send('Entry updated!');
    else
      res.status(404).send('Entry not updated!');

    next();
  });

  /* POST REQUESTS */
  router.post('/', (req, res, next) => {
    if (dbc.create(req.body))
      res.status(200).send('Entry created!');
    else
      res.status(500).send('Entry not created!');

    next();
  });

  /* DELETE REQUESTS */
  router.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id))
      res.status(200).send('Entry deleted!');
    else
      res.status(404).send('Entry not deleted!');

    next();
  });

  return router;
};
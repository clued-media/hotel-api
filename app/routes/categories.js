'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');
var config = require('../../config');

function Categories() {
  var dbc = require('../components/db_client')('categories');
  var categories = router(dbc);

  categories.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'Category');
    json['name'] = entry.name;

    res.send(json);
    next();
  });

  categories.post('/', (req, res, next) => {
    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).json('Entry created');
      else res.status(500).json('Entry not created');
    });

    next();
  });

  categories.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    dbc.update(req.body, (entity) => {
      if (entity) res.status(200).json('Entry updated');
      else res.status(500).json('Entry not updated');
    });

    next();
  });

  return categories;
}

module.exports = Categories();
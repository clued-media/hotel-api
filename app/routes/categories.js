'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Categories() {
  var dbc = require('../components/db_client')('categories');
  var categories = router(dbc);

  categories.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    if (entry) {
      var json = jsonld.createResource(req.originalUrl, 'Category');
      json['name'] = entry.name;

      res.send(json);
    } else {
      res.status(404).json('Not Found');
    }

    next();
  });

  categories.post('/', (req, res, next) => {
    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('Category not created successfully');
      next();
    });
  });

  categories.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    dbc.update(req.body, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.status(500).json('Category not updated successfully');
      next();
    });
  });

  categories.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id)) {
      res.status(200).json('OK');
    } else {
      res.status(500).json('Category not deleted successfully');
    }

    next();
  });

  return categories;
}

module.exports = Categories();
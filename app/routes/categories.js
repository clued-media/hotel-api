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
      res.sendStatus(404);
    }

    next();
  });

  categories.post('/', (req, res, next) => {
    dbc.create(req.body, (entity) => {
      if (entity) res.sendStatus(201);
      else res.sendStatus(500);
    });

    next();
  });

  categories.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    dbc.update(req.body, (entity) => {
      if (entity) res.sendStatus(200);
      else res.sendStatus(500);
    });

    next();
  });

  return categories;
}

module.exports = Categories();
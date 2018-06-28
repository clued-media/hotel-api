'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');
var config = require('../../config');

function Facilities() {
  var dbc = require('../components/db_client')('facilities');
  var facilities = router(dbc);

  facilities.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    if (entry) {
      var json = jsonld.createResource(req.originalUrl, 'Facility');
      json['name'] = entry.name;
      json['category'] = entry.category;

      res.send(json);
    } else {
      res.status(404).json('Not Found');
    }
    next();
  });

  facilities.post('/', (req, res, next) => {
    req.body.category = config.ns + '/categories/' + req.body.category;

    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('Facility not created successfully');
      next();
    });
  });

  facilities.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;
    req.body.category = config.ns + '/categories/' + req.body.category;

    dbc.update(req.body, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.status(500).json('Facility not updated successfully');
      next();
    });
  });

  facilities.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id)) {
      res.status(200).json('OK');
    } else {
      res.status(500).json('Facility not deleted successfully');
    }

    next();
  });

  return facilities;
}

module.exports = Facilities();
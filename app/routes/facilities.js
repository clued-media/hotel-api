'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');
var config = require('../../config');

function Facilities() {
  var dbc = require('../components/db_client')('facilities');
  var facilities = router(dbc);

  facilities.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'Facility');
    json['name'] = entry.name;
    json['category'] = entry.category;

    res.send(json);
    next();
  });

  facilities.post('/', (req, res, next) => {
    req.body.category = config.ns + '/categories/' + req.body.category;

    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).json('Entry created');
      else res.status(500).json('Entry not created');
    });

    next();
  });

  facilities.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;
    req.body.category = config.ns + '/categories/' + req.body.category;

    dbc.update(req.body, (entity) => {
      if (entity) res.status(200).json('Entry updated');
      else res.status(500).json('Entry not updated');
    });

    next();
  });

  return facilities;
}

module.exports = Facilities();
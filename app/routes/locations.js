'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');
var config = require('../../config');

function Locations() {
  var dbc = require('../components/db_client')('locations');
  var locations = router(dbc);

  locations.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    var json = jsonld.createResource(req.originalUrl, 'Location');
    json['longitude'] = entry.longitude;
    json['latitude'] = entry.latitude;
    json['city'] = entry.city;
    json['country'] = entry.country;
    json['country_code'] = entry.country_code

    res.send(json);
    next();
  });

  locations.post('/', (req, res, next) => {
    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).json('Entry created');
      else res.status(500).json('Entry not created');
    });

    next();
  });

  locations.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    dbc.update(req.body, (entity) => {
      if (entity) res.status(200).json('Entry updated');
      else res.status(500).json('Entry not updated');
    });

    next();
  });

  return locations;
}

module.exports = Locations();
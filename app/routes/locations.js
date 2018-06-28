'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

function Locations() {
  var dbc = require('../components/db_client')('locations');
  var locations = router(dbc);

  locations.get('/:id', (req, res, next) => {
    var entry = dbc.find(req.params.id);

    if (entry) {
      var json = jsonld.createResource(req.originalUrl, 'Location');
      json['longitude'] = entry.longitude;
      json['latitude'] = entry.latitude;
      json['city'] = entry.city;
      json['country'] = entry.country;
      json['country_code'] = entry.country_code

      res.send(json);
    } else {
      res.status(404).json('Not Found');
    }
    next();
  });

  locations.post('/', (req, res, next) => {
    dbc.create(req.body, (entity) => {
      if (entity) res.status(201).send(entity);
      else res.status(500).json('Location not created successfully');
    });

    next();
  });

  locations.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    dbc.update(req.body, (entity) => {
      if (entity) res.status(200).send(entity);
      else res.status(500).json('Location not updated successfully');
    });

    next();
  });

  locations.delete('/:id', (req, res, next) => {
    if (dbc.remove(req.params.id)) {
      res.status(200).json('OK');
    } else {
      res.status(500).json('Location not deleted successfully');
    }

    next();
  });

  return locations;
}

module.exports = Locations();
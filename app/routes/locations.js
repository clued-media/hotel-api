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
      res.sendStatus(404);
    }
    next();
  });

  locations.post('/', (req, res, next) => {
    dbc.create(req.body, (entity) => {
      if (entity) res.sendStatus(201);
      else res.sendStatus(500);
    });

    next();
  });

  locations.put('/:id', (req, res, next) => {
    req.body['id'] = req.params.id;

    dbc.update(req.body, (entity) => {
      if (entity) res.sendStatus(200);
      else res.sendStatus(500);
    });

    next();
  });

  return locations;
}

module.exports = Locations();
'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

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

  return locations;
}

module.exports = Locations();
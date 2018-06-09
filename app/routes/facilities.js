'use strict';

var router = require('../components/router');
var jsonld = require('../components/jsonld_factory');

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

  return facilities;
}

module.exports = Facilities();
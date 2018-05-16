'use strict';

var router = require('../components/router');

function Locations() {
  var dbc = require('../components/db_client')('./data/locations.json');

  return router(dbc);
}

module.exports = Locations();
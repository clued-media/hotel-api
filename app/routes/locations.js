'use strict';

var router = require('../components/router');
var db = require('../../data/locations.json');

function Locations() {
  var dbc = require('../components/db_client')(db);

  return router(dbc);
}

module.exports = Locations();
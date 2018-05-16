'use strict';

var router = require('../components/router');

function Facilities() {
  var dbc = require('../components/db_client')('./data/facilities.json');

  return router(dbc);
}

module.exports = Facilities();
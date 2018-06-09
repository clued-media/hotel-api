'use strict';

var router = require('../components/router');

function Categories() {
  var dbc = require('../components/db_client')('facility_categories');

  return router(dbc);
}

module.exports = Categories();
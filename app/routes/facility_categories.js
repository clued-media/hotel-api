'use strict';

var router = require('../components/router');

function Categories() {
  var dbc = require('../components/db_client')('./data/facility_categories.json');

  return router(dbc);
}

module.exports = Categories();
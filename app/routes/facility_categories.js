'use strict';

var router = require('../components/router');
var db = require('../../data/facility_categories.json');

function Categories() {
  var dbc = require('../components/db_client')(db);

  return router(dbc);
}

module.exports = Categories();
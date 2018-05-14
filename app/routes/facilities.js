'use strict';

var router = require('../components/router');
var db = require('../../data/facilities.json');

function Facilities() {
  var dbc = require('../components/db_client')(db);

  return router(dbc);
}

module.exports = Facilities();
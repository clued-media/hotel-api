'use strict';

var router = require('../components/router');
var db = require('../../data/payments.json');

function Payments() {
  var dbc = require('../components/db_client')(db);

  return router(dbc);
}

module.exports = Payments();
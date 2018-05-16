'use strict';

var router = require('../components/router');

function Payments() {
  var dbc = require('../components/db_client')('./data/payments.json');

  return router(dbc);
}

module.exports = Payments();
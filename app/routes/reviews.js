'use strict';

var router = require('../components/router');

function Reviews() {
  var dbc = require('../components/db_client')('reviews');

  return router(dbc);
}

module.exports = Reviews();
'use strict';

var router = require('../components/router');

function Reviews() {
  var dbc = require('../components/db_client')('./data/reviews.json');

  return router(dbc);
}

module.exports = Reviews();
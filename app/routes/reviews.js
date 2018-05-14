'use strict';

var router = require('../components/router');
var db = require('../../data/reviews.json');

function Reviews() {
  var dbc = require('../components/db_client')(db);

  return router(dbc);
}

module.exports = Reviews();
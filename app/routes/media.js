'use strict';

var router = require('../components/router');

function Media() {
  var dbc = require('../components/db_client')('./data/media.json');

  return router(dbc);
}

module.exports = Media();
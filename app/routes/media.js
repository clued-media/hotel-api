'use strict';

var router = require('../components/router');
var db = require('../../data/media.json');

function Media() {
  var dbc = require('../components/db_client')(db);

  return router(dbc);
}

module.exports = Media();
'use strict';

var router = require('../components/router');

function Media() {
    // Insert further API endpoints.
    return router(require('../../data/media.json'));
}

module.exports = Media();

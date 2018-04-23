'use strict';

var router = require('../components/router');

function Hotels() {
    // Insert further API endpoints.
    return router(require('../../data/hotels.json'));
}

module.exports = Hotels();
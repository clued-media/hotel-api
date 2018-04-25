'use strict';

var router = require('../components/router');

function Locations() {
    // Insert further API endpoints.
    return router(require('../../data/locations.json'));
}

module.exports = Locations();

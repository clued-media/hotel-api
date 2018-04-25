'use strict';

var router = require('../components/router');

function Facilities() {
    // Insert further API endpoints.
    return router(require('../../data/facilities.json'));
}

module.exports = Facilities();

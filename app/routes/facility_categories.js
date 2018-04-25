'use strict';

var router = require('../components/router');

function Facility_categories() {
    // Insert further API endpoints.
    return router(require('../../data/facility_categories.json'));
}

module.exports = Facility_categories();

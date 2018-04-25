'use strict';

var router = require('../components/router');

function Bookings() {
    // Insert further API endpoints.
    return router(require('../../data/bookings.json'));
}

module.exports = Bookings();

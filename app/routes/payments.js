'use strict';

var router = require('../components/router');

function Payments() {
    // Insert further API endpoints.
    return router(require('../../data/payments.json'));
}

module.exports = Payments();

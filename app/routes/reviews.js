'use strict';

var router = require('../components/router');

function Reviews() {
    // Insert further API endpoints.
    return router(require('../../data/reviews.json'));
}

module.exports = Reviews();

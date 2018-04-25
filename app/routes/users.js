'use strict';

var router = require('../components/router');

function Users() {
    // Insert further API endpoints.
    return router(require('../../data/users.json'));
}

module.exports = Users();

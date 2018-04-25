'use strict';

var express = require('express');

module.exports = (db = null) => {
    var router = express.Router();

    /* GET REQUESTS */
    router.get('/', (req, res, next) => {
        res.send(JSON.stringify(db));
        next();
    });

    router.get('/:id', (req, res, next) => {
        res.send(JSON.stringify(db[req.params.id]));
        next();
    });

    /* PUT REQUESTS */
    router.put('/', (req, res, next) => {
        res.send('TEST PUT!\n');
        next();
    });

    /* POST REQUESTS */
    router.post('/', (req, res, next) => {
        res.send('TEST POST!\n');
        next();
    });

    /* DELETE REQUESTS */
    router.delete('/', (req, res, next) => {
        res.send('TEST DELETE!\n');
        next();
    });

    return router;
};

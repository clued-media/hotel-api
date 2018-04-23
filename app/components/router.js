'use strict';

var express = require('express');

module.exports = (db = null) => {
    var router = express.Router();

    router.get('/', (req, res, next) => {
        res.send(JSON.stringify(db));
        next();
    });

    router.put('/', (req, res, next) => {
        res.send('TEST PUT!');
        next();
    });

    router.post('/', (req, res, next) => {
        res.send('TEST POST!');
        next();
    });

    router.delete('/', (req, res, next) => {
        res.send('TEST DELETE!');
        next();
    });

    return router;
};
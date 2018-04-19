var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var hotels = require('./js/hotels');
hotels(app);

app.listen(port);

console.log('RESTful WebServices server started on: ' + port);

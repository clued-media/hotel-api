var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* REGISTER APP TO SERVICES */
var hotels = require('./js/hotels');
hotels(app);

var bookings = require('./js/bookings');
bookings(app);

var users = require('./js/users');
userss(app);

app.listen(port);

console.log('RESTful WebServices server started on: ' + port);

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes.
app.use('/users', require('./app/routes/users'));
app.use('/hotels', require('./app/routes/hotels'));
app.use('/bookings', require('./app/routes/bookings'));
app.use('/payments', require('./app/routes/payments'));
app.use('/reviews', require('./app/routes/reviews'));
app.use('/facilities', require('./app/routes/facilities'));
app.use('/facility_categories', require('./app/routes/facility_categories'));
app.use('/locations', require('./app/routes/locations'));
app.use('/media', require('./app/routes/media'));

// enable logging requests
// TODO: use some module to beautify this
app.use((req, res, next) => {
    console.log(req);
    next();
});

app.listen(port, () => {
    console.log('RESTful Web Server started on *:' + port);
});

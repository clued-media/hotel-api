var express = require('express'),
  logger = require('morgan'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser'),
  fs = require('fs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Register routes.
app.get('/', (req, res, next) => {
  fs.readFile('./hydra/entrypoint.jsonld', 'utf8', (err, data) => {
    res.setHeader('Content-Type', 'application/ld+json');
    res.send(JSON.parse(data));
    next();
  });
});

app.get('/vocab', (req, res, next) => {
  fs.readFile('./hydra/apidoc.jsonld', 'utf8', (err, data) => {
    res.send(JSON.parse(data));
    next();
  });
});

app.get('/contexts/:jsonld', (req, res, next) => {
  fs.readFile('./hydra/contexts/' + req.params.jsonld, 'utf8', (err, data) => {
    res.send(JSON.parse(data));
    next();
  });
});

app.use('/users', require('./app/routes/users'));
app.use('/hotels', require('./app/routes/hotels'));
app.use('/rooms', require('./app/routes/rooms'));
app.use('/bookings', require('./app/routes/bookings'));
app.use('/reviews', require('./app/routes/reviews'));
app.use('/facilities', require('./app/routes/facilities'));
app.use('/categories', require('./app/routes/facility_categories'));
app.use('/locations', require('./app/routes/locations'));
app.use('/media', require('./app/routes/media'));

// enable logging requests
app.use(logger('dev'));

app.listen(port, () => {
  console.log('RESTful Web Server started on *:' + port);
});
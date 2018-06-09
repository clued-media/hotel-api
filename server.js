var express = require('express'),
  logger = require('morgan'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser'),
  config = require('./config.json');

var apidoc = require('./hydra/apidoc.json'),
  entrypoint = require('./hydra/entrypoint.json');

// Init middlewares.
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set header to serve JSON-LD content and link to API documentation.
app.use((req, res, next) => {
  res.contentType('application/ld+json');
  res.setHeader('Link', '<https://sws-group-7-hotel-api.herokuapp.com/api/v1/vocab/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
  next();
});

app.get(config.ns + '/', (req, res, next) => {
  res.send(entrypoint);
  next();
});

app.get(config.ns + '/vocab', (req, res, next) => {
  res.send(apidoc);
  next();
});

app.get(config.ns + '/contexts/:resource', (req, res, next) => {
  res.send(require('./hydra/contexts/' + req.params.resource + '.json'));
  next();
});

// app.use(config.ns + '/users', require('./app/routes/users'));
// app.use(config.ns + '/hotels', require('./app/routes/hotels'));
app.use(config.ns + '/rooms', require('./app/routes/rooms'));
// app.use(config.ns + '/bookings', require('./app/routes/bookings'));
app.use(config.ns + '/reviews', require('./app/routes/reviews'));
app.use(config.ns + '/facilities', require('./app/routes/facilities'));
app.use(config.ns + '/categories', require('./app/routes/facility_categories'));
app.use(config.ns + '/locations', require('./app/routes/locations'));
app.use(config.ns + '/media', require('./app/routes/media'));

// enable logging requests
app.use(logger('dev'));

app.listen(port, () => {
  console.log('RESTful Web Server started on *:' + port);
});
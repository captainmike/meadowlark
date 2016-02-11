var express = require('express');
var app = module.exports = express();
var fortune = require('./lib/fortune.js');
var weatherService = require('./lib/weather_service.js');

// set up handlebars view engine
var handlebars = require('express-handlebars')
app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  if (!res.locals.widget) res.locals.widget = {};
  res.locals.widget.weather = weatherService.getWeatherData();
  next();
});

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/tours/hood-river', function(req, res) {
  res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res) {
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
  res.render('tours/request-group-rate');
});

app.get('/about', function(req, res) {
  res.render('about', { fortune: fortune.getFortune() });
});

// custom 404 page
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log( 'Express started on http://localhost:' +
                app.get('port') + '; press Ctrl-C to terminate.' );
  });
}

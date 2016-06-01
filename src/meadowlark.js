'use strict';

var express = require('express');
var app = module.exports = express();
var fortune = require('./lib/fortune.js');
var weatherService = require('./lib/weather_service.js');

// set up handlebars view engine
var handlebars = require('express-handlebars')
app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if (!this._sections) this._sections = {};
      if (!this._sections[name]) this._sections[name] = [];

      if (options.fn) {
        this._sections[name].push(options.fn(this));
      } else {
        let text = this._sections[name].join("\n");
        this._sections[name] = [];
        return text;
      }
    }
  }
}));
app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));

app.use((req, res, next) => {
  if (!res.locals.widget) res.locals.widget = {};
  res.locals.widget.weather = weatherService.getWeatherData();
  next();
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', (req, res) => {
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate');
});

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() });
});

// custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' +
                 app.get('port') + '; press Ctrl-C to terminate.');
  });
}

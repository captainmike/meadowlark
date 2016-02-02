require('mocha-generators').install();

var Nightmare = require('nightmare');
var url = require('url');
var expect = require('chai').expect;
var server = require('../../meadowlark.js');

var base = 'http://localhost:7500';

before((done) => {
  server.listen(7500, done);
});

describe('/tours/request-group-rate', () => {
  var nightmare;

  beforeEach(() => {
    nightmare = Nightmare()
  });

  afterEach(function*() {
    yield nightmare.end();
  });

  context('when visiting via referrer', () => {
    it('sets referrer to /tours/hood-river', function*() {
      var referrer = yield nightmare
        .goto(build_url('/tours/hood-river'))
        .click('.requestGroupRate')
        .evaluate(function() {
          return document.querySelector('input[name=referrer]').value;
        });

      expect(referrer).to.eq(build_url('/tours/hood-river'));
    });

    it('sets referrer to /tours/oregon-coast', function*() {
      var referrer = yield nightmare
        .goto(build_url('/tours/oregon-coast'))
        .click('.requestGroupRate')
        .evaluate(function() {
          return document.querySelector('input[name=referrer]').value;
        });

      expect(referrer).to.eq(build_url('/tours/oregon-coast'));
    });
  });

  context('when visiting directly', () => {
    it('does not set referrer', function*() {
      var referrer = yield nightmare
        .goto(build_url('/tours/request-group-rate'))
        .evaluate(function() {
          return document.querySelector('input[name=referrer]').value;
        });

      expect(referrer).to.eq('');
    });
  });
});

function build_url(path) {
  return url.resolve(base, path);
}

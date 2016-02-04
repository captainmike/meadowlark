require('mocha-generators').install();

var Nightmare = require('nightmare');
var url = require('url');
var expect = require('chai').expect;
var base = 'http://localhost:7500';

describe('/', () => {
  var app = require('../../meadowlark.js');
  var server;

  before((done) => {
    server = app.listen(7500, done);
  });

  after(function () {
    server.close();
  });

  var nightmare;

  beforeEach(() => {
    nightmare = Nightmare()

    Nightmare.action('body', function (done) {
      this.evaluate_now(function() {
        return document.body.innerHTML;
      }, done)
    })
  });

  afterEach(function*() {
    yield nightmare.end();
  });

  it('renders content', function*() {
    var titleCopy = yield nightmare
      .goto(build_url('/'))
      .title();

    expect(titleCopy).to.eq('Meadowlark Travel');

    var titleTag = yield nightmare
      .goto(build_url('/'))
      .exists('h1');

    expect(titleTag).to.be.true;

    var bodyText = yield nightmare
      .goto(build_url('/'))
      .body();

    expect(bodyText).to.match(/Welcome to Meadowlark Travel/);
  });
});

function build_url(path) {
  return url.resolve(base, path);
}

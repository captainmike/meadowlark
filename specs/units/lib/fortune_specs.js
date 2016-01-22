var fortune = require('../../../lib/fortune.js');
var expect = require('chai').expect;

describe("fortune", () => {
  it('returns cookie', () => {
    expect(typeof fortune.getFortune()).to.be.a('string');
  });
});

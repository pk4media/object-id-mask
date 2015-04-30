'use strict';

var expect = require('must');
var StringCharCode = require('../lib/string_char_code');

describe('String Character Code Tests', function() {

  it('can encode a string to an array of character codes', function() {
    expect(StringCharCode.encode('This is a test!')).be
    .eql([84,104,105,115,32,105,115,32,97,32,116,101,115,116,33]);
  });

  it('can decode an array to a string of character codes', function() {
    expect(StringCharCode.decode(
      [84,104,105,115,32,105,115,32,97,32,116,101,115,116,33])
    ).to.equal('This is a test!');
  });

  it('can encode and decode unicode characters', function() {
    var testString = 'Ааа́Ббб́Ввв́ГгҐґДдį໘';

    expect(StringCharCode.decode(StringCharCode.encode(testString))).be
    .equal(testString);
  });

});

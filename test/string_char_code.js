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

  it('can encode and decode a number but return a string', function() {
    var testValue = 1;

    expect(StringCharCode.decode(StringCharCode.encode(testValue))).be
    .equal('1');
  });

  it('can encode and decode a date but return an iso string', function() {
    var testValue = new Date(1976, 6, 10, 2, 45, 34, 234);

    expect(StringCharCode.decode(StringCharCode.encode(testValue))).be
    .equal('1976-07-10T09:45:34.234Z');
  });

  it('can encode and decode an array but return a comma delimited string', function() {
    var testValue = ['This is a test!',
    'Ааа́Ббб́Ввв́ГгҐґДдį໘',
    1,
    new Date(1976, 6, 10, 2, 45, 34, 234)];

    expect(StringCharCode.decode(StringCharCode.encode(testValue))).be
    .equal('This is a test!,Ааа́Ббб́Ввв́ГгҐґДдį໘,1,1976-07-10T09:45:34.234Z');
  });

  it('can encode and decode an object but return a json string', function() {
    var testValue = {
      test1: 'This is a test!',
      test2: 'Ааа́Ббб́Ввв́ГгҐґДдį໘',
      test3: 1,
      test4: new Date(1976, 6, 10, 2, 45, 34, 234)
    };

    expect(StringCharCode.decode(StringCharCode.encode(testValue))).be
    .equal('{"test1":"This is a test!","test2":"Ааа́Ббб́Ввв́ГгҐґДдį໘","test3":1,' +
      '"test4":"1976-07-10T09:45:34.234Z"}');
  });

});

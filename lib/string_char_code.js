'use strict';

var StringCharCode = {};

StringCharCode.encode = function(text) {
  return text.split('').map(function(chr) {
    return chr.charCodeAt(0);
  });
}

StringCharCode.decode = function(characterCodes) {
  return characterCodes.map(function(chrCode) {
    return String.fromCharCode(chrCode);
  }).join('');
}

module.exports = StringCharCode;

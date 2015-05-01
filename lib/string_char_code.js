'use strict';

var StringCharCode = {};

/* Used to handle the special cases */
function convertValueToString(value) {
  switch (typeof value) {
    case 'undefined':
      return '';
    case 'object':
      if (value instanceof Date) return value.toISOString();
      if (Array.isArray(value)) {
        return value.map(function(innerValue) {
          return convertValueToString(innerValue);
        }).toString();
      }
      return JSON.stringify(value);
    default:
      return value.toString();
  }
}

StringCharCode.encode = function(text) {
  return convertValueToString(text).split('').map(function(chr) {
    return chr.charCodeAt(0);
  });
}

StringCharCode.decode = function(characterCodes) {
  return characterCodes.map(function(chrCode) {
    return String.fromCharCode(chrCode);
  }).join('');
}

module.exports = StringCharCode;

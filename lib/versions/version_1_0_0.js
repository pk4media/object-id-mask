'use strict';

var HashIds = require('hashids');
var Version = {};

/* This needs to return an object that has two functions
.encode(object_type_id, id) returns a string
.decode(string) returns a number
*/
Version.getEncoder = function(salt, config) {
  var newHasher = new HashIds(salt, config.minHashLength);
  return {
    encode: function(object_type_id, id) {
      if (typeof object_type_id !== 'number' || object_type_id < 0) {
        throw new Error('object_type_id needs to be a positive integer only.');
      }
      if (typeof id !== 'number' || id < 0) {
        throw new Error('object_type_id needs to be a positive integer only.');
      }
      return newHasher.encode([object_type_id, id]);
    },
    decode: function(masked_id) {
      return newHasher.decode(masked_id);
    }
  };
}

module.exports = Version;

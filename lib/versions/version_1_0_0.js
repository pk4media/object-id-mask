'use strict';

var HashIds = require('hashids');
var StringCharCode = require('../string_char_code');
var hashers = {};

var version = {};
var versionSalt = '';

version.version = '1';

version.init = function(config) {
  versionSalt = config.salt;
  if (config.version) {
    version.version = config.version;
    versionAsArray = config.version.split('');
  }
}

version.encode(id, object_name) {
  var currentHasher = hashers[object_name];
  if(!currentHasher) {
    hashers[object_name] = new HashIds(versionSalt + object_name);
    currentHasher = hashers[object_name];
  }

  var versionHash = currentHasher.encode(StringCharCode.encode(version.version));
  var objectNameHash = currentHasher.encode(StringCharCode.encode(object_name));
  return versionHash + ':' + objectNameHash + ':' currentHasher.encode(id);
}

module.exports =

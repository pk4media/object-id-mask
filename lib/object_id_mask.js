'use strict';

var HashIds = require('hashids');
var _ = require('lodash');
var StringCharCode = require('./string_char_code');
var systemVersions = require('./versions');

function mergeConfigOptions(config) {
  /* extent omiting versions */
  var currentConfig = _.omit(_.assign({}, systemVersions, config), 'versions');

  /* now merge versions */
  if (config && config.versions) {
    currentConfig.versions = _.assign({}, config.versions, systemVersions.versions);
  } else {
    currentConfig.versions = _.assign({}, systemVersions.versions);
  }

  return currentConfig;
}

module.exports = function(config) {
  var currentConfig = mergeConfigOptions(config);

  /* these can never changes or you never be able to get version and object name */
  var systemHashIds = (new HashIds(systemVersions.salt));
  var systemDelimiter = currentConfig.delimiter;

  var encoderCache = {};
  var ObjectIdMask = {};

  ObjectIdMask.encode = function(id, object_type_id, version) {
    var currentVersion = version;
    if (!currentVersion) currentVersion = currentConfig.default_version;

    var encoder;
    if (encoderCache[currentVersion] && encoderCache[currentVersion][object_type_id]) {
      encoder = encoderCache[currentVersion][object_type_id];
    } else {
      /* use version salt if set else use main salt */
      var salt = currentConfig.versions[currentVersion].salt || currentConfig.salt;
      encoder = currentConfig.versions[currentVersion].getEncoder(salt, currentConfig);

      if (!encoderCache[currentVersion]) encoderCache[currentVersion] = {};

      encoderCache[currentVersion][object_type_id] = encoder;
    }

    return currentVersion + systemDelimiter + encoder.encode(object_type_id, id);
  }

  ObjectIdMask.decode = function(id) {
    var allValues = id.split(systemDelimiter);
    if (allValues.length < 2) throw new Error('Id \'' + id.toString() + '\' is not a valid');

    var version = allValues.shift();
    var encodedString = allValues[0]; //second value
    if (allValues.length > 1) {
      encodedString = allValues.join(systemDelimiter); //had extra dilimiters join them together
    }

    var salt = currentConfig.versions[version].salt || currentConfig.salt;
    var decoder = currentConfig.versions[version]
    .getEncoder(salt, currentConfig);
    var decodedValues = decoder.decode(encodedString)
    return {
      version: version,
      object_type_id: decodedValues[0],
      id: decodedValues[1]
    }
  }

  return ObjectIdMask;
}

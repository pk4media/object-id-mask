'use strict';

var version1 = require('./versions/version_1_0_0');

module.exports = function() {
  return {
    current_version: 1,
    versions: [
      '1': version1
    ]
  }
};

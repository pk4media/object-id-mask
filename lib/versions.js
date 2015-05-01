'use strict';

var version1 = require('./versions/version_1_0_0');

module.exports = {
  default_version: 1,
  salt: 'FtQ4mb+mDAc2DV!f#S?YzmgXmX@j&d',
  delimiter: '-',
  minHashLength: 10,
  versions: {
    '1': {
      getEncoder: version1.getEncoder
    }
  }
};

'use strict';

var ObjectIdMask = require('../lib/object_id_mask');

describe('Object Id Mask Tests', function() {

  it('can encode a string to an array of character codes', function() {
    console.log(ObjectIdMask.encode(1, 'user'));
  });

});

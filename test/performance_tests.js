'use strict';

var ObjectIdMask = require('../lib/object_id_mask')();
var expect = require('must');

describe('Performance tests for Object Id Mask', function() {

  it('can encode 10,000 ids in under 1 second - uses cache', function() {
    var time = process.hrtime();
    for (var i = 0; i < 10000; i++) {
      ObjectIdMask.encode(i, 1);
    }
    var diff = process.hrtime(time);
    expect(diff[0]).to.be.lt(1);
  });

  it('can encode 5,000 different object ids in under 1 second - no cache', function() {
    var time = process.hrtime();
    for (var i = 0; i < 5000; i++) {
      ObjectIdMask.encode(i, i);
    }
    var diff = process.hrtime(time);
    expect(diff[0]).to.be.lt(1);
  });

});

'use strict';

var ObjectIdMask = require('../lib/object_id_mask')();
var expect = require('must');

describe('Object Id Mask Tests with no config', function() {

  it('can get an encoded user id', function() {
    var object_type_id = 12;
    var object_id = 9128390;
    expect(ObjectIdMask.encode(object_id, object_type_id))
    .to.equal('1-nmpi4G9Y6R');
  });

  it('can get values back from encoded string', function() {
    var encodedStr = ObjectIdMask.encode(13213214, 15);
    var values = ObjectIdMask.decode(encodedStr);

    expect(values).to.be.an.object()
    expect(values.id).to.be.equal(13213214);
    expect(values.object_type_id).to.be.equal(15);
  });

});

'use strict';

var DefaultObjectIdMask = require('../lib/object_id_mask')();
var ObjectIdMask = require('../lib/object_id_mask')({ salt: 'My test secret' });
var expect = require('must');

describe('Object Id Mask Tests with salt set', function() {

  it('encoded a user id is different then with the default no salt set', function() {
    var object_type_id = 12;
    var object_id = 9128390;
    expect(ObjectIdMask.encode(object_id, object_type_id)).to.not
    .equal(DefaultObjectIdMask.encode(object_id, object_type_id));
  });

  it('can get values back from encoded string with overridden salt', function() {
    var encodedStr = ObjectIdMask.encode(13213214, 0);
    var values = ObjectIdMask.decode(encodedStr);

    expect(values).to.be.an.object();
    expect(values.id).to.be.equal(13213214);
    expect(values.object_type_id).to.be.equal(0);
  });

});

'use strict';

var Base64 = require('./base64')
var DefaultObjectIdMask = require('../lib/object_id_mask')();
var ObjectIdMask = require('../lib/object_id_mask')({
  default_version: 'MyCustom1',
  versions: {
    'MyCustom1': {
      salt: 'this is my secret',
      getEncoder: function(object_name, config) {
        //This needs to return an object like this
        return {
          encode: function(object_type_id, id) { //Takes number
            return Base64.fromNumbers([object_type_id, id], config.delimiter);
          },
          decode: function(encryptedString) {
            return Base64.toNumbers(encryptedString, config.delimiter);
          }
        };
      }
    }
  }
});
var expect = require('must');

describe('Object Id Mask Tests cusomized', function() {

  it('encoded a user id is different then with the default when cusomized', function() {
    var object_type_id = 44;
    var object_id = 9128390;
    expect(ObjectIdMask.encode(object_id, object_type_id)).to.not
    .equal(DefaultObjectIdMask.encode(object_id, object_type_id));
  });

  it('can get values back from encoded string with customized', function() {
    var encodedStr = ObjectIdMask.encode(13213214, 44);
    var values = ObjectIdMask.decode(encodedStr);

    expect(values).to.be.an.object();
    expect(values.id).to.be.equal(13213214);
    expect(values.object_type_id).to.be.equal(44);
  });

});

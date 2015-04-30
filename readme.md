# Object Id Mask

A little npm module that uses the Hashids library to mask IDs. This adds on a version
and a object name so if you just get an id you can figure out for what object it
was for.

## Examples

To mask your id for object user:
```javascript
var ObjectIdMask = require('object-id-mask')({
  current_salt: 'this is a secret'
});

var user = {
  id: 1,
  email: 'test@test.com',
  name: 'John';
  last_name: 'Doe'
}

user.id = ObjectIdMask.encode(user.id, 'user');

return user;
```

Now if you get this object back you can decode it like this:

```javascript
user.id = ObjectIdMask.decode(user.id, 'user');
```

If later on you want to add more versions but still need to get the old versions
back you can pass the config like so:

```javascript
var ObjectIdMask = require('object-id-mask')({
  current_version: 2,
  current_salt: 'this is a new secret',
  versions: [
    '1': {
      salt: 'this is a secret'
    }
  ]
});
```

If you want to use different library or code between versions you can also
override the logic to encode and decode the id like this:

```javascript
var ObjectIdMask = require('object-id-mask')({
  current_version: 2,
  versions: [
    '1': {
      salt: 'this is a secret',
      encode: function(id, object_name) {
        //Custome or old logic
      },
      decode: function(id, object_name) {
        //Custome or old logic
      }
    }
  ]
});
```

As we move up in versions we will keep setting up default versions and values for
these so if you don't want to worry about it just pass in the current_salt.

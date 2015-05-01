# Object Id Mask

## What is this?

A little npm module that uses the Hashids library to mask IDs. This adds on a version
and a object type id so if you just get an id you can figure out for what object type it
was for and can have different versions based on salt.

## Why would I use this instead of Hashids?

* Hashids said they are not always backwards compatable between versions so this handles
the version issue.
* It wraps the object type in as well so user id 1 and group id 1
are not the same hash.
* Use this means you can tell qhat object this id belongs to from the id type.
This could be a hardcoded file you run in your API or in the database.

## Examples

To mask your id for object user:
```javascript
var ObjectIdMask = require('object-id-mask')({
  salt: 'this is a secret, you should set it or I use a system default'
});

var user_type_id = 1; //Could get this from the database it is up to you.
var user = {
  id: 1,
  email: 'test@test.com',
  name: 'John';
  last_name: 'Doe'
}

user.id = ObjectIdMask.encode(user.id, user_type_id);

return user;
```

Now if you get this object back you can decode it like this:

```javascript
var user = req.body;
var user_type_id = 1; //Could get this from the database it is up to you.

user.id = ObjectIdMask.decode(user.id, user_type_id);
```

You can add your own versions as well as override the default version to yours:

```javascript
var ObjectIdMask = require('object-id-mask')({
  default_version: 'Custom 1',
  versions: {
    'Custom 1': {
      salt: 'this is my secret',
      getEncoder: function(object_name, config) {
        //This needs to return an object like this
        return {
          encode: function(object_type_id, id) { //Takes postive integer numbers only
            // returns a encrypted string
          },
          decode: function(encryptedString) {
            // return a number (the Id)
          }
        };
      }
    }
  }
});
```

We will use just plain numbers as we move up in versions so if you do customize
it make sure you add some namespace in the version.

You can also override the default delimiter with whatever you want. Here is how you can override the delimiter:

```javascript
var ObjectIdMask = require('object-id-mask')({
  delimiter: ':',
  salt: 'this is my secret'
});

var user_type_id = 1;

ObjectIdMask.decode(22, user_type_id);
//This returns Version:Hash isntead of Version-Hash

```

'use strict';

var _Rixits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";

/* Just a simple Base64 implementation */
module.exports = {
  fromNumbers: function(numbers, delimiter) {
    return numbers.map(this.fromNumber).join(delimiter);
  },

  toNumbers: function(rixits, delimiter) {
    return rixits.split(delimiter).map(this.toNumber);
  },

  fromNumber: function(number) {
    if (isNaN(Number(number)) || number === null ||
      number === Number.POSITIVE_INFINITY)
      throw "The input is not valid";
    if (number < 0)
      throw "Can't represent negative numbers now";

    var rixit;
    var residual = Math.floor(number);
    var result = '';
    while (true) {
      rixit = residual % 64
      result = _Rixits.charAt(rixit) + result;
      residual = Math.floor(residual / 64);

      if (residual == 0)
        break;
      }
    return result;
  },

  toNumber: function(rixits) {
    return rixits.split('').reduce(function(previousValue, currentValue) {
      return (previousValue * 64) + _Rixits.indexOf(currentValue);
    }, 0);
  }
}

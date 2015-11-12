var frequency = module.exports = function(string) {
  var object = {};
  var array = [];
  array = string.split(' ');

  for (var i = 0; i < array.length; i++) {

    array[i] = array[i].toLowerCase();
    array[i] = array[i].replace(/[^\w\s]/gi, '');

    if(typeof object[array[i]] === 'number') {
      object[array[i]]++;
    }

    if(object[array[i]] === undefined) {
      object[array[i]] = 1;
    }
  }

  return object;
};



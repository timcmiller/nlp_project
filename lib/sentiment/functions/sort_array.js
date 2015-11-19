module.exports = exports = function(object) {
  var array = [];
  var reorderObject = {};
  for (var key in object) {
    array.push([key, object[key]]);
  }
  array.sort(function(a, b) {return b[1] - a[1];});

  for(var i = 0; i < array.length; i++) {
    reorderObject[array[i][0]] = array[i][1];
  }
  return reorderObject;
};

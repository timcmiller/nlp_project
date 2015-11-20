var lodash = require('lodash');



module.exports = exports = function(text, negWords) {
  var j = 0;
  for(i = 0; i < text[j].length; i++) {


    text[j][i] = text[j][i].toLowerCase();
    if(lodash.contains(negWords, text[j][i])) {
      text[j][i] = -1;
    }

    if (text[j][i + 1] === undefined && text[j +1] !== undefined) {
      j++;
      i = -1;
    }
  }

  return text;

};

module.exports = exports = function(text) {

  text = text.replace(/[$#%*"@'()\[\]{}:;_&\-]/g, '');
  return text.split(/[\.,!?]/g);

};

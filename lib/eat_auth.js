var eat = require('eat');
var User = requier(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.headers.token || (req.body)? req.body.token : '';
  if(!token) {
    console.log('no token');
    return res.status(401).json({msg: 'You do no have authority to do that.'});
  }

  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'Your token is bad!'});
    }

    User.findOne({_id: decoded._id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'There is no user under that name'});
      }

      if(!user) {
        console.log(err);
        return res.status(401).json({msg: 'There is no user under that name.'});
      }

      req.user = user;
      next();
    });
  });
};

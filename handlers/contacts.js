const db = require('../models');

exports.index = async (req, res, next) => {
    try {
        db.User.find({}).exec(function(err, users) {   
            if (err) throw err;
            res.render('contactlist.ejs', { "users": users });
        });
    } catch(err) {
      return next(err);
    }
    
  }
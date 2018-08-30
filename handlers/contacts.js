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

exports.connect = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.user.username);
        var data = {receiver: req.body.username, sender: req.user.username, pending: true};
        var myData = new db.Connection(data);
        myData.save()
        .then(item => {
            db.User.find({}).exec(function(err, users) {   
                if (err) throw err;
                res.redirect('/contacts');
            });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    } catch(err) {
        return next(err);
    }
}
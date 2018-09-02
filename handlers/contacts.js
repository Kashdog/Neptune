const db = require('../models');

exports.index = async (req, res, next) => {
    try {
        db.User.find({}).exec(function(err, users) {   
            if (err) throw err;
            var allusersexceptcurrent = [];
            for(var i = 0; i < users.length; i++){
                if(users[i].username != req.user.username){
                    allusersexceptcurrent.push(users[i]);
                }
            }
            console.log(allusersexceptcurrent);
            res.render('contactlist.ejs', { "users": allusersexceptcurrent });
        });
    } catch(err) {
      return next(err);
    }
    
}

exports.changeView = async (req, res, next) => {
    try{
        console.log(req.body.view);
        if (req.body.view == "all"){
            res.redirect("/contacts");
        } 
        else if(req.body.view == "incontacts"){

        }
        else if (req.body.view == "invites"){
            
        }
    } catch(err) {
        return next(err);
    }
}

exports.connect = async (req, res, next) => {
    try {
          console.log(req.body.username);
          let connection = {
            sender: req.user.username,
            receiver: req.body.username,
            pending: true
          }


          let requestSubmission = await db.User.findOneAndUpdate({
            username: req.body.username}, 
            {
                $push:{
                    connections: connection
                }
            }
        );

          console.log("Connection submitted.");
    
        // var data = {receiver: req.body.username, sender: req.user.username, pending: true};
        // var myData = new db.Connection(data);
        // myData.save()
        // .then(item => {
        //     db.User.find({}).exec(function(err, users) {   
        //         if (err) throw err;
        //         res.redirect('/contacts');
        //     });
        // })
        // .catch(err => {
        //     res.status(400).send("unable to save to database");
        // });
    } catch(err) {
        console.log(err);6
        return next(err);
    }
}
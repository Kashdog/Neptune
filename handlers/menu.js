exports.index = async (req, res, next) => {
    try {
        if(!req.session.userId || req.session.userId == ""){
            console.log("true");
            res.redirect("/auth/login");
        }
        res.render('menu');
    } catch(err) {
      return next(err);
    }
}
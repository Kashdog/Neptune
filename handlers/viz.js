exports.index = async (req, res, next) => {
    try {
        res.render('viz');
    } catch(err) {
      return next(err);
    }
}
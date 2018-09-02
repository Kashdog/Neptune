const db = require('../models');

exports.index = async (req, res, next) => {
    try {
        res.render('menu');
    } catch(err) {
      return next(err);
    }
}
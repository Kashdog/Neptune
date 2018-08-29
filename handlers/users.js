const db = require('../models');

exports.index = async (req, res, next) => {
  try {
    res.render("profile")
  } catch(err) {
    return next(err);
  }
  
}

exports.edit = async (req, res, next) => {
  try {
    res.render("createprofile")
  } catch(err) {
    return next(err);
  }
}

exports.update = async (req, res, next) => {
  try {

  } catch(err) {
    return next(err);
  }
}

module.exports = exports;
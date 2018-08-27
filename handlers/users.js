exports.index = (req, res, next) => {
  res.render("profile")
}

exports.edit = (req, res, next) => {
  res.render("createprofile")
}

module.exports = exports;
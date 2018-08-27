const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/auths"),
      authMW   = require("../middleware/auth"),
      passport = require('passport');

router.route("/signup")
  .get(handler.signup)
  .post(handler.create)

router.route("/login")
  .get(handler.login)
  .post(authMW.auth, handler.authenticate);

module.exports = router;
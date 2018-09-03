const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/auths");

router.route("/signup")
  .get(handler.signup)
  .post(handler.create);

router.route("/login")
  .get(handler.login)
  .post(handler.authenticate);

router.route("/logout")
  .get(handler.logout);

router.route("/facebook")
  .get(handler.facebook);

module.exports = router;
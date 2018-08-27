const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/auths"),
      authMW   = require("../middleware/auth");

router.route("/signup")
  .get(handler.signup)
  .post(handler.create)

router.route("/login")
  .get(handler.login)
  .post(authMW.auth, handler.authenticate);

  router.route("/logout")
  .get(handler.logout)

module.exports = router;
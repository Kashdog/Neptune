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

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
// /auth/facebook/callback
router.route("/facebook")
  .get(handler.facebook)

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

router.route("/facebook/callback")
  .get(handler.facebookcallback)

module.exports = router;
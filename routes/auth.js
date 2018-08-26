const express = require("express"),
      router  = express.Router(),
      handler = require("../handlers/auths");

router.route("/signup")
  .post(handler.signup);

module.exports = router;
const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/users"),
      authMW   = require("../middleware/auth");

router.route("/")
  .get(handler.index)

router.route("/edit")
  .get(handler.edit)
  .post(handler.update)

module.exports = router;
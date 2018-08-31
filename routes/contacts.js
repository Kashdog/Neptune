const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/contacts"),
      authMW   = require("../middleware/auth");

router.route("/")
  .get(handler.index)
  .post(handler.changeView)

router.route("/connect/")
  .post(handler.connect)

module.exports = router;
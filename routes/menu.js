const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/menu");

router.route("/")
  .get(handler.index)

module.exports = router;
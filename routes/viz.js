const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/viz");

router.route("/")
    .get(handler.index)
module.exports = router;
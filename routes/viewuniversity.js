const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/viewuniversity");

router.route("/:name")
    .get(handler.index)

module.exports = router;
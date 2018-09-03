const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/viewprofile");

router.route("/:username")
    .get(handler.index)

module.exports = router;
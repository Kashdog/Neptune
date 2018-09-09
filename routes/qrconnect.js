const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/qrconnect");

router.route("/:username")
    .get(handler.index)
module.exports = router;
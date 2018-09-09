const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/viewuniversity");

router.route("/profile/:name")
    .get(handler.index)
//View People who studied at a University
router.route("/members/:name")
    .get(handler.viewmembers)
module.exports = router;
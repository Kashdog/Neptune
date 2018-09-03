const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/contacts");

router.route("/")
  .get(handler.index)

router.route("/changeview")
  .post(handler.changeView)

// Route to see people who have invite you
router.route("/invites/")
  .get(handler.invites)

// Route to see your connections

router.route("/connections/")
  .get(handler.connections)



router.route("/connect/")
  .post(handler.connect)

router.route("/acceptinvite/")
  .post(handler.acceptinvite)

module.exports = router;
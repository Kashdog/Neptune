const express  = require("express"),
      router   = express.Router(),
      handler  = require("../handlers/contacts");

router.route("/")
  .get(handler.index)

// Change html based on radio button for different types of users
router.route("/changeview")
  .post(handler.changeView)

// Show different groups 

router.route("/changegroup")
  .post(handler.changeGroup)

// Route to see people who have invite you
router.route("/invites/")
  .get(handler.invites)

// Route to see your connections

router.route("/connections/")
  .get(handler.connections)

// Route to see your recommendations

router.route("/recommendations/")
  .get(handler.recommendations)

// Route to see University Groups

router.route("/groups/universities")
  .get(handler.universities)

// Route to edit or create University Groups
router.route("/groups/universities/edit")
  .get(handler.editUniversity)
  .post(handler.updateUniversity)

// Route to join a University Group

router.route("/groups/universities/:name/join")
  .get(handler.joinUniversity)

// Route to see Organization Groups

router.route("/groups/organizations")
  .get(handler.organizations)

// Route to edit or create Organization Groups
router.route("/groups/organizations/edit")
  .get(handler.editOrganization)
  .post(handler.updateOrganization)

// Route to join an Organization Group

router.route("/groups/organizations/:name/join")
  .get(handler.joinOrganization)

// Route to Connect with others

router.route("/connect/")
  .post(handler.connect)

// Route to Accept Invites

router.route("/acceptinvite/")
  .post(handler.acceptinvite)

module.exports = router;
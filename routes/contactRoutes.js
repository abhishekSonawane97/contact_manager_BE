const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController.js");
const validateToken = require("../middleware/veryfyToken.js");
const router = express.Router();

// contact routes
router.use( validateToken );
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;

const express = require("express");
const { getUsers, registerUser, getUser, editUser, deleteUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/veryfyToken");

const router = express.Router();


router.route("/").get(getUsers);
router.post("/register", registerUser );
// router.post("/register", (req, res)=>{
//     res.status(201).json({ message : "Register the user" });
// });

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.route("/:id").get(getUser).put( editUser).delete(deleteUser);

module.exports = router;
const express = require("express");
const { signUp, getAllUsers, updateUser } = require("../controllers/userController");
const upload = require("../utils/upload");
const router = express.Router();

// Sign Up with Image Upload
router.post("/signup", upload.single("image"), signUp);
router.get("/get", getAllUsers);
router.put('/users/:id', upload.single('image'), updateUser);

module.exports = router;

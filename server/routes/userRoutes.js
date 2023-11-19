// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const User = require("../models/User");

// Define user routes
router.get("/", async (req, res) => {
  res.json(await User.find());
});
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
// router.post("/", async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);
//     res.json(newUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

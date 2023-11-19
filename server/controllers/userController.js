// controllers/userController.js

const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Filtering
    const filter = {};
    if (req.query.domain) {
      filter.domain = req.query.domain;
    }
    if (req.query.gender) {
      filter.gender = req.query.gender;
    }
    if (req.query.availability !== undefined) {
      filter.available = req.query.availability;
    }

    // Searching
    const search = {};
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      search.$or = [{ first_name: searchRegex }, { last_name: searchRegex }];
    }

    // Combine filter and search conditions
    const conditions = { ...filter, ...search };

    const users = await User.find(conditions).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(conditions);

    res.json({
      users,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rest of the CRUD operations remain the same...
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

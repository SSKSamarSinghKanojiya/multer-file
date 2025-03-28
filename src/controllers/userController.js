const User = require("../models/User");
const path = require('path');
const fs = require('fs');

const signUp = async (req, res) => {
  try {
    const { fullname, email, mobileNumber, password, city } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const user = new User({
      fullname,
      email,
      mobileNumber,
      password,
      city,
      image: imagePath,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users - Read
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { fullname, city } = req.body;
    
    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Delete old image if a new image is uploaded
    if (req.file) {
      if (user.image) {
        const oldImagePath = path.join(__dirname, "../", user.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete old image
        }
      }
      user.image = req.file.path; // Save new image path
    }
    
    // Update other fields
    if (fullname) user.fullname = fullname;
    if (city) user.city = city;
    
    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signUp, getAllUsers, updateUser };
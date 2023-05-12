const express = require("express");
const bcrypt = require("bcrypt");
const Aadhar = require('../models/aadhar');

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


async function login(email, password) {
    const user = await Aadhar.findOne({ email }).exec();

    if (!user) {
      return null;
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      return null;
    }
  
    return user;
}

module.exports = loginPost;

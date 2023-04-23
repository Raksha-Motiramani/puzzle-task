const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// login
router.post('/login' , async (req , res) => {
  try {
    const { username , password} = req.body;

    if(!username || !password) {
      return res.status(400).json({ error: "pls fill the data" });
    }

    const userlogin = await User.findOne({ username });

    if(userlogin)
    {
      const isMatch = bcrypt.compare(password, userlogin.password);
      //const isMatch = await bcrypt.compare(password , userlogin.password);
      console.log(isMatch);

      if(!isMatch)
      {
        res.status(400).json({ error: "Invalid credentials" });
      }
      else
      {
        res.json({ message: "user login successful" });
      }
    }
    else
    {
      res.status(400).json({ error: "invalid credentials" });
    }
  }
  catch (err) {
    console.log(err);
  }
})

module.exports = router
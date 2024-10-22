const bcrypt = require("bcryptjs");
const User = require("../models/user.models");
const generateTokenAndSetCookie = require("../services/generateToken");

const handleSignup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10); // 10 is best for security and latency purposes
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT Token here
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(500).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordValid = await bcrypt.compare(password, user?.password || ""); // by comparing empty string it will not give us error and we have placed the ? after user it help us to prevent error that user is not defined, ? meaning if user present ok or if user not present then be also okay it will not give us error.

    if (!user || !isPasswordValid) { // If user is not found or isPasswordValid is valid or not then we show this message
      res.status(400).json({
        error: "Invalid username or password",
      }); 
    }

    generateTokenAndSetCookie(user._id, res); // If user is found and password is valid then we generate the token,

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const handleLogout = (req, res) => {
  res.send("Logout page");
};

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
};

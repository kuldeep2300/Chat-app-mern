const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateTokenAndSetCookie } = require("../services/generateToken");

const handleSignup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, gender } = req.body;

      // Validate required 
      if (!fullName || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
      }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10); // 10 is best for security and latency purposes
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?fullName=${fullName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?fullName=${fullName}`;

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

    } else {
      return res.status(500).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in handleSignup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    ); // by comparing empty string it will not give us error and we have placed the ? after user it help us to prevent error that user is not defined, ? meaning if user present ok or if user not present then be also okay it will not give us error.

    if (!user || !isPasswordValid) {
      // If user is not found or isPasswordValid is valid or not then we show this message
      return res.status(400).json({
        error: "Invalid username or password",
      });
    }

    const token = generateTokenAndSetCookie(user); // If user is found and password is valid then we generate the token,
    // console.log('Token generated successfully');
    // We have write 3rd argument to make this bit secure.

    // Cookie for browser usage
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // Here 15 days is the expiry we have to write in miliseconds.
      httpOnly: true, // prevents XSS attacks cross-site scripting attacks
      // sameSite: "strict", // CSRF attacks cross-site request forgery attack
      secure: true, 
      sameSite: 'none' , // Allow cross-site cookie sharing
      domain: 'chat-app-eobh.onrender.com', // Allow cross-site cookie sharing
    });

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in handleLogin controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleLogout = (req, res) => {
  try {
    res.clearCookie("jwt"); // Clear the cookie by name
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in handleLogout controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
};

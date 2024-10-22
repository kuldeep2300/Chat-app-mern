const jwt = require("jsonwebtoken");

// We have write this in bash terminal to generate some random secret -> openssl rand -base64 32
// For proper safety and authentication

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // We have write 3rd argument to make this bit secure.
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Here 15 days is the expiry we have to write in miliseconds.
    httpOnly: true, // prevents XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attack
    secure: process.env.NODE_ENV !== "development",
  });
};


module.exports = generateTokenAndSetCookie;

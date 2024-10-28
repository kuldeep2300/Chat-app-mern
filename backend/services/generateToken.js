const JWT = require("jsonwebtoken");

// We have write this in bash terminal to generate some random secret -> openssl rand -base64 32
// For proper safety and authentication

const generateTokenAndSetCookie = (user) => {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
  };

  const token = JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  return token;
};

const validateToken = (token) => {
  const payload = JWT.verify(token, process.env.JWT_SECRET);
  return payload;
}

module.exports = {generateTokenAndSetCookie, validateToken};

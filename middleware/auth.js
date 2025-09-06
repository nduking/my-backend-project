const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    //Get token from header
    const token = req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "Access denied. No token provided.",
      });
    }
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Get user from database
    const user = await User.findById(decoded.userid).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is valid but user not found",
      });
    }
    //Add user to request object
    req.user = decoded;
    next(); //Continue to the next function
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = auth;

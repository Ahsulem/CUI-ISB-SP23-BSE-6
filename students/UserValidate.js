const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();


// SP23-BSE-007
// ALL /user/validate
// route: verifies token + user role before accessing secured LMS routes
router.all("/validate", async (req, res) => {
  try {

    // Extract Bearer token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // Decode + verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for this token."
      });
    }

    // Valid LMS roles from the assignment case study
    const validRoles = ["admin", "teacher", "student", "head"];

    if (!validRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Invalid role. Access denied."
      });
    }

    // Successfully validated token + role
    return res.status(200).json({
      success: true,
      message: "User authenticated. Access granted.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        assignedClasses: user.assignedClasses
      }
    });

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
      error: error.message
    });
  }
});

module.exports = router;

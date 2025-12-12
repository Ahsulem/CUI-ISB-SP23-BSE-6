// student/getMaterial.js

const express = require("express");
const router = express.Router();
const Material = require("../models/Material");
const User = require("../models/User");
const mongoose = require("mongoose");

function studentAuth(req, res, next) {
  if (!req.user || req.user.role !== "student") {
    return res.status(403).json({ message: "Access denied. Student only." });
  }
  next();
}

// GET /student/material
// Shows list of lecture files. Reads from Material schema by student's assigned classes.
router.get("/material", studentAuth, async (req, res) => {
  try {
    const studentId = req.user._id;

    // Get student with their assigned classes
    const student = await User.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if student has assigned classes
    if (!student.assignedClasses || student.assignedClasses.length === 0) {
      return res.status(200).json({
        message: "No classes assigned to this student",
        materials: []
      });
    }

    // Find all materials for the student's assigned classes
    const materials = await Material.find({ 
      classId: { $in: student.assignedClasses } 
    })
      .populate('classId', 'classname')
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Materials retrieved successfully",
      count: materials.length,
      materials: materials.map(mat => ({
        _id: mat._id,
        title: mat.title,
        fileUrl: mat.fileUrl,
        className: mat.classId?.classname || 'Unknown',
        classId: mat.classId?._id,
        uploadedBy: mat.uploadedBy?.name || 'Unknown',
        createdAt: mat.createdAt
      }))
    });

  } catch (error) {
    console.error("Error fetching materials:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

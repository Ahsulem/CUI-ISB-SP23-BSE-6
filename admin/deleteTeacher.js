// DELETE /admin/teacher/:id
// SP23-BSE-022

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Class = require("../models/Class");

router.delete("/teacher/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;

    // Validate if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid teacher ID format"
      });
    }

    // 1) Check if teacher exists and is actually a teacher
    const teacher = await User.findOne({ _id: teacherId, role: "teacher" });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found or user is not a teacher"
      });
    }

    // 2) Remove teacher from all classes where assigned
    await Class.updateMany(
      { teacher: teacherId },
      { $unset: { teacher: "" } }
    );

    // (Optional) Also remove class IDs from teacher.assignedClasses, 
    // but since we are deleting teacher, it's not necessary.

    // 3) Delete teacher from User collection
    await User.findByIdAndDelete(teacherId);

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully and removed from classes"
    });
  } catch (error) {
    console.error("Error in DELETE /admin/teacher/:id", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Class = require("../models/Class");
const mongoose = require("mongoose");

// PUT /admin/class/:id
// Updates class details (classname, teacher, students)
router.put("/class/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { classname, teacher, students } = req.body;

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid class ID format" });
    }

    // Check if class exists
    const existingClass = await Class.findById(id);
    if (!existingClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Prepare update object - only include fields that are provided
    const updateData = {};
    if (classname !== undefined) updateData.classname = classname;
    if (teacher !== undefined) updateData.teacher = teacher;
    if (students !== undefined) updateData.students = students;

    // Update class using findByIdAndUpdate
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('teacher', 'name email').populate('students', 'name email');

    res.status(200).json({
      message: "Class updated successfully",
      class: updatedClass
    });

  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

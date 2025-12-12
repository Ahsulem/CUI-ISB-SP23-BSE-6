const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Class = require("../models/Class");

// PUT /admin/assignteacher/:id
// Assigns a teacher to a class. Updates Class.teacher = teacherId and pushes class to User.assignedClasses[]
router.put("/assignteacher/:id", async (req, res) => {
  try {
    const classId = req.params.id;
    const { teacherId } = req.body;

    // Validate required fields
    if (!teacherId) {
      return res.status(400).json({ message: "teacherId is required" });
    }

    // Check if class exists
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if teacher exists and has role "teacher"
    const teacher = await User.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (teacher.role !== "teacher") {
      return res.status(400).json({ message: "User is not a teacher" });
    }

    // Update class with teacher
    classDoc.teacher = teacherId;
    await classDoc.save();

    // Add class to teacher's assignedClasses if not already present
    if (!teacher.assignedClasses.some(id => id.toString() === classId.toString())) {
      teacher.assignedClasses.push(classId);
      await teacher.save();
    }

    res.status(200).json({
      message: "Teacher assigned to class successfully",
      class: classDoc,
    });
  } catch (error) {
    console.error("Error assigning teacher to class:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

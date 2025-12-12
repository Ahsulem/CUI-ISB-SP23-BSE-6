// SP23-BSE-021 - DELETE /admin/class/:id

const express = require("express");
const router = express.Router();

const Class = require("../models/Class");
const User = require("../models/User");

// Deletes class and removes reference from students/teachers
router.delete("/class/:id", async (req, res) => {
  try {
    const classId = req.params.id;

    // Check if class exists
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Remove class reference from teacher
    if (classDoc.teacher) {
      await User.updateOne(
        { _id: classDoc.teacher },
        { $pull: { assignedClasses: classId } }
      );
    }

    // Remove class reference from students
    if (classDoc.students.length > 0) {
      await User.updateMany(
        { _id: { $in: classDoc.students } },
        { $pull: { assignedClasses: classId } }
      );
    }

    // Delete class
    await Class.findByIdAndDelete(classId);

    res.status(200).json({
      message: "Class deleted successfully and references removed",
      deletedClassId: classId,
    });

  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

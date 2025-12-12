// Muhammad Awais SP23-BSE-031 POST /teacher/addassign
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Assignment = require("../models/Assignment");

function teacherAuth(req, res, next) {
  if (!req.user || req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied. Teacher only." });
  }
  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/assignments");
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /teacher/addassign
// Creates a new assignment with uploaded file, description, and classId
router.post("/addassign", teacherAuth, upload.single("file"), async (req, res) => {
  try {
    const { title, description, classId } = req.body;

    if (!title || !description || !classId) {
      return res.status(400).json({
        message: "title, description and classId are required"
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const fileUrl = `/uploads/assignments/${req.file.filename}`;

    const assignment = await Assignment.create({
      title,
      description,
      classId,
      fileUrl,
      submissions: [],
      createdAt: new Date()
    });

    return res.status(201).json({
      message: "Assignment created successfully",
      assignment
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


// SP23-BSE-047B Fatima hasan Gilani POST /teacher/addmarks

const express = require("express");
const router = express.Router();
const Marks = require("../models/Marks");

router.post("/addmarks", async (req, res) => {
  try {
    const { studentId, subjectId, marks } = req.body;

    // Validate required fields
    if (!studentId || !subjectId || marks === undefined || marks === null || marks === "") {
      return res.status(400).json({ message: "studentId, subjectId, and marks are required" });
    }

    // Validate marks
    if (typeof marks !== "number") {
      return res.status(400).json({ message: "Marks must be a valid number" });
    }
    if (isNaN(marks)) {
      return res.status(400).json({ message: "Marks cannot be NaN" });
    }
    if (marks < 0 || marks > 100) {
      return res.status(400).json({ message: "Marks must be between 0 and 100" });
    }

    // Create new marks record
    const newMarks = new Marks({
      studentId,
      subjectId,
      marks
    });

    const savedMarks = await newMarks.save();

    res.status(201).json({
      message: "Marks added successfully",
      marks: savedMarks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.put("/marks/:id", async (req, res) => {
  try {
    const markId = req.params.id;
    const { marks } = req.body;

    if (marks === undefined || marks === null || marks === "") {
      return res.status(400).json({ message: "Marks value is required" });
    }
    if (typeof marks !== "number") {
      return res.status(400).json({ message: "Marks must be a valid number" });
    }
    if (isNaN(marks)) {
      return res.status(400).json({ message: "Marks cannot be NaN" });
    }

    if (marks < 0 || marks > 100) {
      return res.status(400).json({ message: "Marks must be between 0 and 100" });
    }
    const updatedMarks = await Marks.findByIdAndUpdate(
      markId,
      { marks },
      { new: true, runValidators: true, upsert: false }
    );
    if (!updatedMarks) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({
      message: "Marks updated successfully (Re-Evaluation)",
      updatedMarks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});





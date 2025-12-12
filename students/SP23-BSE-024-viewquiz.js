// SP23-BSE-024 - POST /student/viewquiz
// Registration: SP23-BSE-024
// Author: [Your Name]
// Date: December 12, 2025
// Description: Takes classId, fetches list of quizzes from Quiz schema where classId matches.
//              Returns quiz titles and status (attempted or not).

const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const mongoose = require("mongoose");

// Middleware to verify student authentication
function studentAuth(req, res, next) {
  if (!req.user || req.user.role !== "student") {
    return res.status(403).json({ 
      message: "Access denied. Student only.",
      success: false 
    });
  }
  next();
}

// POST /student/viewquiz
// Takes classId, fetches list of quizzes from Quiz schema where classId matches.
// Returns quiz titles and status (attempted or not).
router.post("/viewquiz", studentAuth, async (req, res) => {
  try {
    const { classId } = req.body;
    const studentId = req.user._id;

    // Validate classId
    if (!classId) {
      return res.status(400).json({ 
        message: "classId is required",
        success: false 
      });
    }

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ 
        message: "Invalid classId format",
        success: false 
      });
    }

    // Verify student is enrolled in this class
    const student = await User.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ 
        message: "Student not found",
        success: false 
      });
    }

    // Check if student is assigned to this class
    const isEnrolled = student.assignedClasses.some(
      assignedClassId => assignedClassId.toString() === classId
    );

    if (!isEnrolled) {
      return res.status(403).json({ 
        message: "You are not enrolled in this class",
        success: false 
      });
    }

    // Fetch all quizzes for the given classId
    const quizzes = await Quiz.find({ classId: classId })
      .select('title questions submissions createdAt')
      .sort({ createdAt: -1 });

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json({
        message: "No quizzes found for this class",
        success: true,
        classId: classId,
        quizzes: []
      });
    }

    // Process quizzes to determine status (attempted or not)
    const processedQuizzes = quizzes.map(quiz => {
      // Check if student has attempted this quiz
      const submission = quiz.submissions.find(
        sub => sub.studentId.toString() === studentId.toString()
      );

      return {
        _id: quiz._id,
        title: quiz.title,
        totalQuestions: quiz.questions.length,
        status: submission ? "attempted" : "not attempted",
        marks: submission ? submission.marks : null,
        attemptedAt: submission ? submission.attemptedAt : null,
        createdAt: quiz.createdAt
      };
    });

    return res.status(200).json({
      message: "Quizzes retrieved successfully",
      success: true,
      classId: classId,
      totalQuizzes: processedQuizzes.length,
      quizzes: processedQuizzes
    });

  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return res.status(500).json({ 
      message: "Internal server error while fetching quizzes",
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;

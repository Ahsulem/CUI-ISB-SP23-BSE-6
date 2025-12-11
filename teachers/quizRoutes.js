const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// POST route to add a new quiz
router.post('/addquiz', async (req, res) => {
  try {
    // Destructure classId, title, and questions from req.body
    const { classId, title, questions } = req.body;

    // Validate that these fields exist
    if (!classId || !title || !questions) {
      return res.status(400).json({ 
        error: 'Missing required fields: classId, title, and questions are required' 
      });
    }

    // Create a new Quiz instance with an empty submissions array
    const newQuiz = new Quiz({
      classId,
      title,
      questions,
      submissions: [] // Initialize submissions as an empty array
    });

    // Save to the database
    const savedQuiz = await newQuiz.save();

    // Return the saved object
    return res.status(201).json({
      message: 'Quiz created successfully',
      quiz: savedQuiz
    });

  } catch (error) {
    // Error handling: Return 500 if server error
    console.error('Error creating quiz:', error);
    return res.status(500).json({ 
      error: 'Server error occurred while creating quiz' 
    });
  }
});

module.exports = router;

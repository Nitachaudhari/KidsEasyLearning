const Quiz = require("../models/quizModel");

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Add a new quiz question
// @route   POST /api/quizzes
// @access  Public
const addQuiz = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const newQuiz = new Quiz({ question, options, correctAnswer });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getQuizzes, addQuiz };

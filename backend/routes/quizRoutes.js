const express = require("express");
const { getQuizzes, addQuiz } = require("../controllers/quizController");

const router = express.Router();

router.get("/", getQuizzes);
router.post("/", addQuiz);

module.exports = router;

import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import constants from "../constants/httpStatus.js";
import Quiz from "../models/quizModel.js";
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";

const addQuestion = async (req, res) => {
  const { quizId } = req.params;
  const {
    backgroundImage,
    optionQuestion,
    questionType,
    question,
    pointType,
    answerTime,
    answerList,
    questionIndex,
    maxCorrectAnswer,
    correctAnswerCount,
    answerCorrect,
  } = req.body;

  const newQuestion = new Question({
    creator: req.user.id,
    optionQuestion,
    quiz: quizId,
    questionIndex,
    tags: "",
    isPublic: true,
    questionType,
    pointType,
    answerTime,
    backgroundImage,
    question,
    answerList,
    maxCorrectAnswer,
    correctAnswerCount,
    answerCorrect,
  });
  let quiz;
  try {
    const Question = await newQuestion.save();
    quiz = await Quiz.findById(quizId);
    if (quiz == null) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    quiz.questionList.push(Question);
    quiz.numberOfQuestions += 1;
    await quiz.save();

    return res.status(201).json({ Question, quiz });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const getQuestions = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findById(quizId);
    if (quiz == null) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).send(quiz.questionList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestion = async (req, res) => {
  const { quizId, questionId } = req.params;
  try {
    const quiz = await Quiz.findById(quizId);
    if (quiz == null) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const question = quiz.questionList.id(questionId);
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { quizId, questionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    return res.status(404).send(`No quiz with id: ${quizId}`);
  }
  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(404).send(`No question with id: ${questionId}`);
  }

  const question = await Question.findById(questionId);
  const Index = question.questionIndex;
  const quiz = await Quiz.findById(quizId);
  quiz.numberOfQuestions -= 1;

  quiz.questionList = quiz.questionList.filter(
    (item) => String(item._id) !== questionId
  );

  quiz.questionList.map((item) => {
    if (item.questionIndex > Index) {
      item.questionIndex--;
      const handleSetIndex = async () => {
        const question = await Question.findById(item._id);
        question.questionIndex -= 1;
        question.save();
      };
      handleSetIndex();
    }
  });

  await quiz.save();

  try {
    await Question.findByIdAndRemove(questionId);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuestion = async (req, res) => {
  const { quizId, questionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    return res.status(404).send(`No quiz with id: ${quizId}`);
  }
  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(404).send(`No question with id: ${questionId}`);
  }

  const {
    questionType,
    isPublic,
    optionQuestion,
    backgroundImage,
    question,
    pointType,
    answerTime,
    answerList,
    tags,
    questionIndex,
    maxCorrectAnswer,
    correctAnswerCount,
    answerCorrect,
  } = req.body;

  const newQuestion = new Question({
    _id: questionId,
    creatorId: req.user.id,
    optionQuestion,
    quizId,
    questionIndex,
    tags,
    isPublic,
    questionType,
    pointType,
    answerTime,
    backgroundImage,
    question,
    answerList,
    maxCorrectAnswer,
    correctAnswerCount,
    answerCorrect,
  });

  const quiz = await Quiz.findById(quizId);

  try {
    if (quiz == null) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    await Question.findByIdAndUpdate(questionId, newQuestion, {
      new: true,
    });

    let questionIndex = quiz.questionList.findIndex(
      (obj) => obj._id == questionId
    );
    quiz.questionList[questionIndex] = {
      _id: questionId,
      creatorId: req.user.id,
      optionQuestion,
      quizId,
      questionIndex: questionIndex + 1,
      tags,
      isPublic,
      questionType,
      pointType,
      answerTime,
      backgroundImage,
      question,
      answerList,
      maxCorrectAnswer,
      correctAnswerCount,
      answerCorrect,
    };
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, quiz, {
      new: true,
    });
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export {
  addQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};

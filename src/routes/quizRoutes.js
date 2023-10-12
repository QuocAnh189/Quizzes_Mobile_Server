import express from "express";
const quizRouter = express.Router();

import {
  getQuizzes,
  importQuiz,
  getQuizzesPublics,
  createQuiz,
  getQuiz,
  updateQuiz,
  // getPublicQuizes,
  getQuizzesBySearch,
  getTeacherQuizzes,
  deleteQuiz,
  likeQuiz,
  commentQuiz,
} from "../controllers/quizController.js";

import {
  addQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

import {
  verifyAdmin,
  verifyAccessToken,
} from "../middlewares/authMidleware.js";

import {
  verifyPrivateQuiz,
  verifyQuizOwner,
} from "../middlewares/quizMidleware.js";

quizRouter.use(verifyAccessToken);
// router.get('/allquizzes', getQuizesPublics);
// router.get('/public', getPublicQuizes);

quizRouter.get("/teacher/:teacherId", getTeacherQuizzes);
quizRouter.get("/public", getQuizzesPublics);
quizRouter.get("/search", getQuizzesBySearch);

quizRouter.route("/").get(verifyAdmin, getQuizzes).post(createQuiz);
quizRouter.route("/import").post(importQuiz);

quizRouter
  .route("/:id")
  .get(verifyPrivateQuiz, getQuiz)
  .put(verifyQuizOwner, updateQuiz)
  .delete(verifyQuizOwner, deleteQuiz);
// router.route('/:id').get(getQuiz).put(updateQuiz);

quizRouter.put("/:id/likeQuiz", likeQuiz);
quizRouter.post("/:id/commentQuiz", commentQuiz);

quizRouter.route("/:quizId/questions").post(addQuestion).get(getQuestions);

quizRouter
  .route("/:quizId/questions/:questionId")
  .get(getQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

export default quizRouter;

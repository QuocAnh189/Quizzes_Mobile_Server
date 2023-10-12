import express from "express";
const playerResultRouter = express.Router();

import {
  createPlayerResult,
  getPlayerResults,
  getPlayerResult,
  updatePlayerResult,
  deletePlayerResult,
  addAnswer,
  getAnswers,
  getAnswer,
  updateAnswer,
  deleteAnswer,
  addPlayerResult,
} from "../controllers/playerResultController.js";

import { verifyAccessToken } from "../middlewares/authMidleware.js";

playerResultRouter.use(verifyAccessToken);
playerResultRouter.route("/").get(getPlayerResults).post(createPlayerResult);
playerResultRouter
  .route("/:id")
  .get(getPlayerResult)
  .patch(updatePlayerResult)
  .delete(deletePlayerResult);
// router.route('/:playerResultId/answers').patch(addAnswer).get(getAnswers);
playerResultRouter.route("/:playerId/results/:gameId").patch(addPlayerResult);

playerResultRouter
  .route("/:playerResultId/answers/:answerId")
  .get(getAnswer)
  .patch(updateAnswer)
  .delete(deleteAnswer);

export default playerResultRouter;

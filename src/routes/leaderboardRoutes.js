import express from "express";
const leaderBoardRouter = express.Router();

import {
  getHistory,
  createLeaderboard,
  deleteLeaderboard,
  getLeaderboard,
  addPlayerResult,
  updateQuestionLeaderboard,
  updateCurrentLeaderboard,
} from "../controllers/leaderboardController.js";
import { verifyAccessToken } from "../middlewares/authMidleware.js";

leaderBoardRouter.use(verifyAccessToken);
leaderBoardRouter.route("/:id").get(getLeaderboard).delete(deleteLeaderboard);
leaderBoardRouter.route("/").post(createLeaderboard);
leaderBoardRouter.route("/history/:id").get(getHistory);
leaderBoardRouter.route("/:leaderBoardId/playerresult").patch(addPlayerResult);
leaderBoardRouter
  .route("/:leaderBoardId/questionLeaderBoard")
  .patch(updateQuestionLeaderboard);
leaderBoardRouter
  .route("/:leaderBoardId/currentLeaderBoard")
  .patch(updateCurrentLeaderboard);

export default leaderBoardRouter;

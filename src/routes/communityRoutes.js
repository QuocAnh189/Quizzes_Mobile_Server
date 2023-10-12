import express from "express";
const CommunityRouter = express.Router();

import {
  getCommunities,
  createCommunity,
  updateCommunity,
  deletedCommunity,
  addQuizCommunity,
  deleteQuizCommunity,
  addMessageChatBox,
  getCommunity,
} from "../controllers/communityController.js";

import { verifyAccessToken } from "../middlewares/authMidleware.js";

CommunityRouter.use(verifyAccessToken);
CommunityRouter.get("/:id", getCommunity);
CommunityRouter.route("/").get(getCommunities).post(createCommunity);
CommunityRouter.put("/:id/quiz/:quizId", addQuizCommunity);
CommunityRouter.put("/:id/deleteQuiz/:quizId", deleteQuizCommunity);
CommunityRouter.put("/addMessage/:id", addMessageChatBox);
CommunityRouter.route("/:id").put(updateCommunity).delete(deletedCommunity);

export default CommunityRouter;

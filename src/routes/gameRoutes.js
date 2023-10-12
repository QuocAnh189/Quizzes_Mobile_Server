import express from "express";
const gameRouter = express.Router();

import {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
  addPlayer,
} from "../controllers/gameController.js";

import { verifyAccessToken } from "../middlewares/authMidleware.js";

gameRouter.use(verifyAccessToken);
gameRouter.route("/").get(getGames).post(createGame);
gameRouter.route("/:id").get(getGame).patch(updateGame).delete(deleteGame);
gameRouter.route("/:gameId/players").patch(addPlayer);

export default gameRouter;

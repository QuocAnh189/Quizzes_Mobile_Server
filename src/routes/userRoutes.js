import express from "express";
const userRouter = express.Router();

import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  unFollow,
  followUser,
} from "../controllers/userController.js";

import {
  verifyAccessToken,
  verifyAdmin,
  verifyUserAuthorization,
} from "../middlewares/authMidleware.js";

import uploadCloud from "../config/cloudinary.js";

userRouter.use(verifyAccessToken);
userRouter.route("/").get(getUsers);
// userRouter.route("/").get(verifyAdmin, getUsers).post(verifyAdmin, createUser);

userRouter.route("/:myId/unFollow/:friendId").put(unFollow);
userRouter.route("/:myId/follow/:friendId").put(followUser);
userRouter
  .route("/:id")
  .get(getUser)
  .patch(verifyUserAuthorization, uploadCloud.single("avatar"), updateUser)
  .delete(verifyAdmin, deleteUser);

export default userRouter;

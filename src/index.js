import express from "express";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import uploadCloud from "./config/cloudinary.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import quizRouter from "./routes/quizRoutes.js";
import CommunityRouter from "./routes/communityRoutes.js";
import gameRouter from "./routes/gameRoutes.js";
import leaderboardRouter from "./routes/leaderboardRoutes.js";
import playerResultRouter from "./routes/playerResultRoutes.js";

dotenv.config();
connectDb();
const Port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(cookieParser());
// app.use(upload.array());
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.get("/api/upload/", (req, res) => {
//   console.log("CC");
// });

// app.post("/upload", uploadCloud.single("avatar"), async (req, res) => {
//   console.log(req.file);
//   console.log(req.body);
//   const { info } = req.body;
//   console.log(JSON.parse(info));
//   res.send(req.file);
// });

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/community", CommunityRouter);
app.use("/api/game", gameRouter);
app.use("/api/leaderBoard", leaderboardRouter);
app.use("/api/playerResult", playerResultRouter);

app.use(errorHandler);

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});

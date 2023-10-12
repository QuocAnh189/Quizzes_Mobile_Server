import mongoose from "mongoose";

const leaderBoardSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },

  playerResultList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerResult",
    },
  ],

  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },

  pin: {
    type: String,
  },

  questionLeaderBoard: [
    {
      questionIndex: { type: Number },
      questionResultList: [
        {
          player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          playerPoints: { type: Number },
        },
      ],
    },
  ],

  currentLeaderBoard: [
    {
      questionIndex: { type: Number },
      leaderBoardList: [
        {
          player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          playerCurrentScore: { type: Number },
        },
      ],
    },
  ],
});

const Leaderboard = mongoose.model("Leaderboard", leaderBoardSchema);
export default Leaderboard;

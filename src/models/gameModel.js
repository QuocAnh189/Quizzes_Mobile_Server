import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },

  pin: {
    type: String,
  },

  isLive: {
    type: Boolean,
    default: false,
  },

  playerList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  playerResultList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerResult",
    },
  ],
});

const Game = mongoose.model("Game", gameSchema);
export default Game;

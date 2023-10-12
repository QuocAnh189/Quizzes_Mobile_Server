import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    name: { type: String },

    description: { type: String },

    backgroundImage: {
      type: String,
    },

    creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },

    pointsPerQuestion: {
      type: Number,
      min: 1,
    },

    numberOfQuestions: {
      type: Number,
      default: 0,
    },

    isPublic: { type: Boolean, required: true, default: true },

    tags: [String],

    importFrom: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },

    sourceCreator: { type: String },

    likesCount: { type: [String], default: [] },

    comments: { type: [String], default: [] },

    dateCreated: { type: Date, default: new Date() },

    questionList: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Question",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;

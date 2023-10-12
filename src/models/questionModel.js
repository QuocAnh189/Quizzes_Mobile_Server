import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },

    quiz: { type: mongoose.SchemaTypes.ObjectId, ref: "Quiz" },

    tags: [String],

    questionType: {
      type: String,
      enum: ["True/False", "Quiz"],
      required: true,
    },

    optionQuestion: {
      type: String,
      required: true,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    pointType: {
      type: String,
      enum: ["Standard", "Double", "BasedOnTime"],
      required: true,
    },

    answerTime: {
      type: Number,
      min: 5,
      max: 90,
    },

    backgroundImage: {
      type: String,
    },

    question: {
      type: String,
      // required: true
    },

    answerList: [
      {
        name: { type: String },
        body: { type: String },
        isCorrect: { type: Boolean },
      },
    ],

    questionIndex: { type: Number, required: true },

    maxCorrectAnswer: { type: Number, required: true },

    correctAnswerCount: { type: Number, required: true },

    answerCorrect: { type: [String], required: true },
  },

  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;

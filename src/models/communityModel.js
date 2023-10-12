import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  quizzes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Quiz",
  },

  name: {
    type: String,
    required: true,
  },

  backgroundImage: {
    type: String,
  },

  tags: {
    type: String,
  },

  users: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],

  chatBox: {
    type: [Object],
  },
});

const Community = mongoose.model("Community", communitySchema);
export default Community;

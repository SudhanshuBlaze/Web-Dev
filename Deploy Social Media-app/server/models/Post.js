const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    //array of objects
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId, //we can make a reference with "users" collection
    ref: "users",
  },
});

module.exports = model("Post", postSchema);

const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  avatar: String,
});

//returns the model which can be used to create new doc/articles,
//all the articles will be saved in "Users" collection
module.exports = model("User", userSchema);

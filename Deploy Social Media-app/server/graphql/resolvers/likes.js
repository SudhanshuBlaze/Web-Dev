const { UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    // works like toggle function: for both like and unlike
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        // .find(): JS function returns first matching value, works on 'Array'

        if (post.likes.find(like => like.username === username)) {
          // Post already liked, unlike it
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          // Not liked, like it
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};

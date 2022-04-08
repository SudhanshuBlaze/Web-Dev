const Post = require("../../models/Post");
const { ApolloError, UserInputError } = require("apollo-server");
const checkAuth = require("../../util/check-auth");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 }); //sort by createdAt in descending order such that latest posts appear on top
        return posts;
      } catch (err) {
        console.error("Error in 'getPosts'");
        throw new ApolloError(err);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) return post;
        else throw new Error("Post not found");
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      // console.log(user);

      if (body.trim() === "")
        throw new UserInputError("Post body must not be empty");
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();

      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted Successfully!!";
        } else {
          //if some other user is trying to delete the post
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        console.error("Error:Cannot delete Post");
        throw new Error(error);
      }
    },
  },

  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};

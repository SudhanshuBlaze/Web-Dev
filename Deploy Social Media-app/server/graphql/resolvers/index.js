const postsResolver = require("./posts");
const usersResolver = require("./users");
const commentsResolver = require("./comments");
const likeResolver = require("./likes");
// every query needs a resolver which processess some logic then returns what the query returns

module.exports = {
  // each time  any query or mutation returns a post, it will go through this 'Post modifier' and apply these modifications
  Post: {
    likeCount: parent => parent.likes.length,
    //'parent' is just 'post' data without which we return from any func(), that 'post' must go through this modifier and add these properties

    commentCount: parent => parent.comments.length,
  },
  // using spread operators because different resolvers has been put in different files
  // we need to grab hold of them and put them together here in a single object

  Query: { ...postsResolver.Query, ...usersResolver.Query },

  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation,
    ...likeResolver.Mutation,
  },
  Subscription: {
    ...postsResolver.Subscription,
  },
};

// Original resolver looked like this, we have just divided things into separate files,
// to improve Developer Experience

// const resolvers = {
//   Query: {
//     async getPosts() {
//       try {
//         const posts = await Post.find();
//         return posts;
//       } catch (err) {
//         throw new Error(err);
//       }
//     },
//   },
// };

// Note: While we use 'queries' to fetch data, we use 'mutations' to modify server-side data. If 'queries' are the GraphQL equivalent to GET calls in REST, then 'mutations' represent the state-changing methods in REST (like DELETE , PUT , PATCH , etc)

// Mutations are used  to insert, update, or delete data.

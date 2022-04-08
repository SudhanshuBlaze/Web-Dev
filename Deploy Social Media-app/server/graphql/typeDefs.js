const { gql } = require("apollo-server");

module.exports = gql`
  # graphQL type
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]! #it'll return an empty array if there's  no comment
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type User {
    id: ID!
    email: String!
    avatar: String
    token: String!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post] #array of Posts will be returned
    getPost(postId: ID!): Post
    getUsers: [User]
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    avatar: String
  }

  type Mutation {
    # takes input of type "RegisterInput"
    register(registerInput: RegisterInput): User! #returns a User(reqd'!')
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;

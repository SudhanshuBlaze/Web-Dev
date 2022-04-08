const User = require("../../models/User");
const { ApolloError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

const generateToken = user => {
  return jwt.sign(
    // all this data is encoded into the token, on successful verification with the "SECRET_KEY" we get this data back in JSON format.
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY, //secret_key is used to encode the token
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) throw new UserInputError("Validation Errors", { errors });

      const user = await User.findOne({ username });
      if (!user) {
        //if no user found in database
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      // we use this function because user.password is encrypted one
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = generateToken(user); //new token is generated at every 'login'

      const returnObj = {
        ...user._doc, //using spread operator to embed a data of a object into another
        id: user.id, //id is not stored in "doc"
        token,
      };
      // console.log(returnObj);
      return returnObj;
    },

    async register(
      _,
      // destructure an object into registerInput which is further destructured
      { registerInput: { username, email, avatar, password, confirmPassword } }
    ) {
      // Validate user data
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) throw new UserInputError("Validation Errors", { errors });

      // Make sure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("This username is taken", {
          // this payload will be used on the client side
          errors: { username: "This username is already taken" },
        });
      }

      // Hash password before storing it in database & gen auth token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        avatar,
        password,
        createdAt: new Date().toISOString(),
      });
      // return 'res' data to the user
      const res = await newUser.save();

      const token = generateToken(res);

      // we are returing object with parameters specified in typeDefs for "User"
      const returnObj = {
        ...res._doc, //using spread operator to embed a data of a object into another
        id: res.id, //id is not stored in "doc"
        token,
      };
      // console.log(returnObj);
      return returnObj;
    },
  },

  Query: {
    async getUsers() {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        console.error("Error in 'getUsers'");
        throw new ApolloError(err);
      }
    },
  },
};

const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
// before creating or deleting a post we need to access request headers to check whether the user is authenticated or not.
module.exports = context => {
  // context= {...headers}
  // console.log(context.req.headers);
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // console.log("authHeader-> " + authHeader);

    // data format of authHeader= "Bearer eyJhbGciOi..."
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      //we need to check that we issued the token and it's not expired
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    //if no token
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  //if no authHeader
  throw new Error("Authorization header must be provided");
};

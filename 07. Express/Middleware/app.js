// The entire idea of middleware is to execute some code before the controller action that sends the response and after the server gets the request from the client. Essentially it is code that executes in the middle of your request, hence the name middleware

const express = require("express");
const app = express();

app.use(loggingMiddleware); //this function is executed first

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/users", authorizeUsersAccess, (req, res) => {
  console.log(req.admin);
  res.send("Users Page");
});
// middleware has the access of (req,res)
function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`);
  next(); //if next is not called then only this function will execute
}

function authorizeUsersAccess(req, res, next) {
  // http://localhost:3000/users?admin=true
  if (req.query.admin === "true") {
    req.admin = true; //if has user access then make the changes in "req" if necessary and then execute the next middle ware else throw error if user does not has access
    next();
  } else {
    res.send("ERROR: You must be an admin");
    //this will stop the execution of next middleware
  }
}

app.listen(3000, () => console.log("Server Started"));

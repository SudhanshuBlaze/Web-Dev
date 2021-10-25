const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = new express();

app.use(express.urlencoded({ extended: true })); //body-parser
app.use(express.static("public"));

app.set("view engine", "ejs");

connect().catch((err) => console.log("Could not connect to server" + err));
async function connect() {
  await mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

const article = new Article({
  title: "Saved from Server",
  content: "Test content",
});
// article.save().then((res)=>console.log(res)).catch(err=>console.log(err));

/*******REQUESTS TARGETTING "/articles" route********/
app
  .route("/articles")
  .get((req, res) => {
    Article.find()
      .then((foundDocs) => res.send(foundDocs))
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    //while post request there be must be a "body"
    console.log(req.body.title);
    console.log(req.body.content);
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    article
      .save()
      .then(() => res.send("Successfully saved new article"))
      .catch((err) => res.send(err));
  })
  .delete((req, res) => {
    Article.deleteMany()
      .then(() => res.send("Successfully deleted"))
      .catch((err) => res.send(err));
  });
/*******REQUESTS TARGETTING "/articles/:customArticle" route********/

app
  .route("/articles/:customArticle")
  .get((req, res) => {
    //   while get request there is "params"
    Article.findOne({ title: req.params.customArticle })
      .then((foundArticle) => res.send(foundArticle))
      .catch((err) => console.log(err));
  })
  .put((req, res) => {
    Article.updateOne(
      { title: req.params.customArticle },
      { title: req.body.title, content: req.body.content }
    )
      .then(() => res.send("Successfully Updated article"))
      .catch((err) => res.send(err));
  })
  .patch((req, res) => {
    Article.updateOne({ title: req.params.customArticle }, { $set: req.body }) //dynamically updating for example if user only wants to patch content
      .then(() => res.send("Patched Successfully"))
      .catch((err) => res.send(err));
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.customArticle })
      .then(() => res.send("Deleted: " + req.params.customArticle))
      .catch((err) => res.send(err));
  });

app.listen(3000, () => {
  console.log("Server Running on PORT 3000");
});

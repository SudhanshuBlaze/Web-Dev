const express = require("express");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); //body-parser
app.use(express.static("public"));

connect().catch(err=>console.log(err));
async function connect() {
  await mongoose.connect("mongodb://localhost:27017/todolistDB", 
  {useNewUrlParser: true, useUnifiedTopology: true});
};

const itemSchema =new mongoose.Schema({ 
  name: String
});
const Item= mongoose.model("Item",itemSchema); 
// create dummy items
const item1=new Item({
  name: "Practice DSA"
});
const item2=new Item({
  name: "Build Projects"
});
const item3=new Item({
  name: "Do Internship"
});

async function insertDummy() {
  const res= await Item.insertMany([item1,item2,item3]);
  console.log(res);
}

app.get("/", function(req, res) {
  const day = date.getDate();

  display().catch(err=> console.log(err))
  async function display() {
    const foundItems= await Item.find({});
    
    if(foundItems.length===0)
      insertDummy().catch(err=>console.log(err));

    res.render("list", {listTitle: day, newListItems: foundItems});
  }
});


app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else { 
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

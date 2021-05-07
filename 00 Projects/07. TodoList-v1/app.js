const express=require("express")
const ejs=require("express")
const Date=require( __dirname+"/Date.js")

const app=express();
app.set("view engine", "ejs")  //This assumes a 'views' directory containing an index.ejs page.
// app.use(express.static("public"));   //public folder contains css files and etc.
app.use(express.urlencoded({ extended: true })); //body-parser
app.use(express.static("public"));

let listItems=[];
let workItems=[];

app.get("/",(req,res)=>{

    let day=Date.getDate();
 
    res.render("todo", {listTitle:day, newItem:listItems})
})

app.post("/",(req,res)=>{
    let item=req.body.newItem;

    //Since, our form posts in "/" route so we have to grab data from "/" route and redirect to work route
    if(req.body.list === "Work"){
        workItems.push(item)
        res.redirect("/work")
    }
    else{
        listItems.push(item);
        res.redirect("/");
    }
})

app.get("/work",(req,res)=>{
    res.render("todo", {listTitle: "Work List", newItem:workItems})  // "todo" here is our .ejs file name
})

app.post("/work",(req,res)=>{
    workItems.push(req.body.newItem)
})

app.listen(3000,()=>{
    console.log("Server is running on Port 3000");
})
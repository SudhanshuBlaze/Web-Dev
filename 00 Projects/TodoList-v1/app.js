const express=require("express")
const ejs=require("express")

const app=express();
app.set("view engine", "ejs")  //This assumes a 'views' directory containing an index.ejs page.
// app.use(express.static("public"));   //public folder contains css files and etc.
app.use(express.urlencoded({ extended: true })); //body-parser

app.get("/",(req,res)=>{
    res.send("<h1>The app is up and running <h1/>")
})

app.listen(3000,()=>{
    console.log("Server is running on Port 3000");
})
const express=require("express");
const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //body-parser

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/signUp.html")
})

app.post("/",(req,res)=>{
    var data=req.body;  //stores data in an Object
    var firstName=data.firstName;
    var lastName=data.lastName;
    var email=data.email;

    console.log(firstName,lastName,email)
})

app.listen(3000, ()=>{
    console.log("Sever is running at port 3000")
})
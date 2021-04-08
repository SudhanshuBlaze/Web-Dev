const { request, response } = require("express");
const express=require("express");
const app=express();

app.get("/" ,(req,res)=>{  // "/" symbol represents home directory
    res.send("<h2>Hello</>");
});

app.get("/about", (req,res)=>{
    res.send("<h1> I am a self-driven tech nerd </>")
})

app.get("/contact", (req,res)=>{
    res.send("<h1> skrourkela@gmail.com </>")
})

app.listen(3000, ()=>{
    console.log("Server has started")
});
 
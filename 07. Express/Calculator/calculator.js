const express=require("express");
// const bodyParser = require("body-parser");
// refer: https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
const app=express();

app.use(express.urlencoded({ extended: true })); //body-parser

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html") // " __dirname " is a constant which helps us to grab the current files location
})

app.post("/", (req,res)=>{
    // console.log(req.body.num1)  //body parser
    var num1= Number(req.body.num1);  //by default it parses in form of text(string), so we have to typecast it into "Numebr"
    var num2= Number(req.body.num2);
    var result= num1+num2;

    res.send("The result of the calculation was:  "+ result);
})

app.get("/bmiCalculator", (req,res)=>{
    res.sendFile(__dirname+"/bmiCalculator.html");
})

app.post("/bmiCalculator", (req,res)=>{
    var height= Number(req.body.height);
    var weight= Number(req.body.weight);
    var result= height/(Math.pow(weight,2));
    console.log(result);

    res.send("your bmi is: "+ result);

})

app.listen(3000, ()=>{
    console.log("Server started at Port 3000");
})
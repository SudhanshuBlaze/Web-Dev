const { response } = require("express");
const express=require("express");
const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //body-parser

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/signUp.html")
})

app.post("/",(req,res)=>{
    const parsedData=req.body;  //stores data in an Object
    const firstName=parsedData.firstName;
    const lastName=parsedData.lastName;
    const email=parsedData.email;
// API reference: https://mailchimp.com/developer/marketing/api/lists/batch-subscribe-or-unsubscribe/

    const userData ={
        members: [  //single object in an array as we will we subscribing one person at a time
            {
                email_address : email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData= JSON.stringify(userData); //converts JS object into JSON 

    const url= "https://us1.api.mailchimp.com/3.0/lists/a2e5a69d08"
    const options={
        method: "POST",
        auth:"SudhanshuBlaze:66bf0bfeca7ee46bdae52f7e8ac5095e-us1"
    }

    const request=https.request(url, options, (response)=>{
        console.log("\nStatus Code: "+ response.statusCode+"\n")

        if(response.statusCode===200)
            res.sendFile(__dirname+"/success.html")
        else 
            res.sendFile(__dirname+"/failure.html")

        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.status
    request.write(jsonData);
    request.end();
    
})

app.post("/failure",(req,res)=>{
    res.redirect("/")
})

app.listen(3000, ()=>{
    console.log("Sever is running at port 3000")
})

// API Key
// 66bf0bfeca7ee46bdae52f7e8ac5095e-us1

// List ID
// a2e5a69d08
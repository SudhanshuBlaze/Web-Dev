const express=require("express")
const https= require("https")
const app=express();
app.use(express.urlencoded({ extended: true })); //body-parser

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/", (req,res)=>{
    const apiKey="6110b493ee46d5c6699cbdeaa0afc523";
    const query=req.body.query;
    console.log(query);

    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&units="+units;

    https.get(url, function(response){
        console.log("Status Code: "+response.statusCode);

        response.on("data", (data)=>{
            const WeatherData=JSON.parse(data);
            const temp= WeatherData.main.temp;
            const desc= WeatherData.weather[0].description;
            const iconID= WeatherData.weather[0].icon;
            const iconUrl ="http://openweathermap.org/img/wn/"+iconID+"@2x.png";

            res.set("Content-Type", "text/html");  //enables HTML render

            res.write("<strong>Weather Description:" +desc+ "</strong> \n");
            res.write( `<h1> The temp in ${query} is `+ temp +" degree celsius </h1>");
            res.write(`<img src=${iconUrl} >`);
            res.send()
        })
    });
})

app.listen(3000, ()=>{
console.log("Server is running on Port 3000");
})
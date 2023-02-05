const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.inputEmail;

    const data = {
        members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: 
            {  
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/bfbcf1703a";

    const options = {
        method: "POST",
        auth: "mehmetsemdinaktay@gmail.com:e4a1e970b68bda573a827894s08e64d99-us21"
    };

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();



});


app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is on port 3000.");
})

/* e4a1e970b68bda573a82789408e64d99-us21 */

/* bfbcf1703a */
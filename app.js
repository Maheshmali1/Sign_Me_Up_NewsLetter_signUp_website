const express = require("express");
const bodyPareser = require("body-parser");
const request = require("request");
const http = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyPareser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res)=>{
    
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    

    var data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    var jsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/6619755692";

    const options={
        method : "POST",
        auth: "Mahesh:1c8e4f96581c36c60941c433510a8f37-us8 "
    }

    const requestserver = http.request(url, options,(response)=>{

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })

    requestserver.write(jsonData);
    requestserver.end();
})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.listen(proecess.env.PORT || 3000,()=>{
    console.log("server listening on port 3000..");
})


// api key : 1c8e4f96581c36c60941c433510a8f37-us8

// list id : 6619755692

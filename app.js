//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        member: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }


        }]
    };

    const url = "https://us13.admin.mailchimp.com/lists/419e1a3c47";
    const option = {
        method: "post",
        auth: "aafc31b09342887aab685844fec85614 - us13"
    };
    const request = https.request(url, option, function(response) {
        response.on("Data", function(data) {

            console.log(JSON.parse("Data"));
        });
    });
    request.write("jsonData");
    request.end();
});

app.listen(3000, function(req, res) {
    console.log("server is running on port 3000");
});
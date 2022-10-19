//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const items = [];
const workItems = ["finish homework", "learn wrb", "learn java"];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
  let today = new Date();
  const options = {
    weekday:"long",
    day: "numeric",
    month:"long"
  };
  let day = today.toLocaleDateString('en-US', options);
  res.render("home", {
    listTitle: day,
    newListItems:items
  });
});

app.post("/",function (req,res) {
  let item = req.body.newItem;
  if(req.body.button === "work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  
});

app.get("/work", function (req,res){
  res.render("home", {
    listTitle: "work",
    newListItems: workItems
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});

//require express dependencie we previously installed
const express = require("express");
const app = express();
const dotenv = require("dotenv");
//require mongoose so we can connect to our database
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");

dotenv.config();

//added this so we can acess the css
app.use("/static", express.static("public"));

//Urlencoded extracts the data from the form by adding it to the body property of the request
app.use(express.urlencoded({ extended: true }));

//connection to db
//got an error with the adding “useFindAndModify” from the tutorial, so changed the following line accordingly
mongoose.connect(process.env.DB_CONNECT).then(()=>{console.log('Connected to db!')

// dedicating a port number and telling our express app to listen to that port so everytime we edit our app, the server will restart automatically
//our server would only run after the connection is made
app.listen(3000, () => console.log("Server Up and running"));
});

//view engine configuration
//.ejs files so we can use them as a template
app.set("view engine", "ejs");

//get method 
//used when relatively non-confidential information is passed and info can be cached as well
//used to request data from a specified resource
app.get('/',(req, res) => {
    res.render('todo.ejs');
    });


//POST METHOD
//used to send data to a server to create/update a resource
//when we click at the add button our app inserts data into the database
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });


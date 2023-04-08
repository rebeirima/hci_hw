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

//I was following the tutorial, however I was getting the following error when implementing the GET, POST, UPDATE, and DELETE functions: MongooseError: Model.find() no longer accepts a callback at Function.find 
// indicating that the find() method no longer accepts a callback function as an argument. in the previous code, they were passing a callback function to the find() method, but this is no longer supported

//get method 
//used when relatively non-confidential information is passed and info can be cached as well
//used to request data from a specified resource
//TodoTask.find({}) returns a Promise, which is handled using the .then() method to render the view with the fetched tasks. If there's an error, the .catch() method will handle it
app.get("/", (req, res) => {
    TodoTask.find({})
      .then((tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
      })
      .catch((err) => {
        console.log(err);
      });
  });



//POST METHOD
//used to send data to a server to create/update a resource
//when we click at the add button our app inserts data into the database
//
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

//UPDATE
//TodoTask.find({}) and TodoTask.findByIdAndUpdate(id, { content: req.body.content }) return Promises which is handled using the .then() and .catch() methods
//First we find our id and we render the new template. Then we update our task using the method findByIdAndUpdate
app.route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    TodoTask.find({})
      .then((tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Failed to update task");
      });
  });

//DELETE
//to have our delete method, we will use the method findByIdAndRemove
app.route("/remove/:id")
  .get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id)
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Failed to delete task");
      });
  });

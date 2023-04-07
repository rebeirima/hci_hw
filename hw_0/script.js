// const declaration of the elements in our index.html files. These should not be changed
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//this event fires when the DOM content is loaded without waiting for the stylesheet to finish loading. We want to pull the to do list idems stored in local storage 
document.addEventListener("DOMContentLoaded",  getLocalTodos);

//adding event listeners of a click (which is fired by the browser when you click something on your mouse) to the button and list events  and a change event listener to the filter 
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    //this function adds the to do list item on the screen and saves it to local storage

    //adds a new div element and adds the "todo" class to it
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //adds a new list item element and sets its inner text to the value of the todo input
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; 
    newTodo.classList.add("todo-item");
    //appends the new list item element to the todo div
    todoDiv.appendChild(newTodo);
    //saves the new todo to local storage
    saveLocalTodos(todoInput.value);
    //creates a new button element for completing the todo and adds the "complete-btn" class to it
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    //appends the completed button element to the todo div
    todoDiv.appendChild(completedButton);
    //creates a new button element for deleting the todo and adds the "trash-btn" class to it
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    //appends the trash button element to the todo div
    todoDiv.appendChild(trashButton);
    //appends the todo div to the todo list
    todoList.appendChild(todoDiv);
    //resets the value of the todo input to an empty string
    todoInput.value = "";
}

function deleteCheck(e) {
    //function is used to handle the deletion and completion of todo items
    //gets the target element of the event
    const item = e.target;
    //checks if the target element has the "trash-btn" class
    if(item.classList[0] === "trash-btn") {
        //gets the parent element of the target element
        const todo = item.parentElement;
        //adds the slide class to the todo div for a transition effect
        todo.classList.add("slide");
        //removes the todo from local storage
        removeLocalTodos(todo);
        //listens for the end of the transition and removes the todo
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }
    //checks if the target element has the "complete-btn" class
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        //toggles the "completed" class on the todo div so the user can see that it is completed on the screen
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    //this function is used to filter the todo items displayed on the screen based on the value of a select box
    //it gets all of the todo items on the screen, iterates over them, and then switches on the value of the select box
    //depending on what the user selects, it shows the corresponding items 
    //gets all todo items
    const todos = todoList.childNodes;
    //iterates over each todo item
    todos.forEach(function(todo) {
        //switches on the value of the select box
        switch(e.target.value) {
            case "all": 
                //shows all todo items
                todo.style.display = "flex";
                break;
            case "completed": 
                //shows only completed todo items
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                //shows only incomplete todo items
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // this function saves the todo variable to the local storage
    let todos;
    //if there are no saved to-do items then you create an empty array
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //if there are saved to-do items, parse them from JSON format
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    //pulls all of the to do list options stored in local storage 
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //loop through each to-do and add it to the to-do list
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    //removes a to-do item from local storage
    let todos;
     //if there are no saved to-do items, create an empty array
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        //if there are saved to-do items, parse them from JSON format
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //get the text of the to-do item to be removed
    const todoIndex = todo.children[0].innerText;
    //find the index of the to-do item in the array and remove it
    todos.splice(todos.indexOf(todoIndex), 1);
    //save the updated to-do list to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}
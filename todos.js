// Dependdancies
// file system
const fs = require("fs");
// prompting pachage
const inquirer = require ("inquirer");

// Data

// Helper Functions =======================================
// Create
// Read
const showTodos = () => {
    
    // read a file with todos
let todos = JSON.parse(fs.readFileSync ("todos.json", "utf-8"));
if (!todos) {
    todos = [];
}

    // go through the todos and show each one
    for (const todo of todos) console.log(todo.title);
};
// Update
// Delete

const showOptions = ()=>{
inquirer.prompt ({
    type: "list",
    message: "What would you like to do?",
    name: "userChoice",
    choices: ["add new to do", "quit"],
})
.then ((answers) => {
    console.log (answers)
})
}

const init = () => {
    // show existing todos
    showTodos();
    // show new todo input
 showOptions();
};


// Init
init ();
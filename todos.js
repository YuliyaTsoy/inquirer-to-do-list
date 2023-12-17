// Dependdancies
// file system
const fs = require("fs");
// prompting pachage
const inquirer = require ("inquirer");

// Data

// Helper Functions =======================================
// Create
const addNewTodo = () => {
    console.clear();
    //ask the user what new to do they want to add
    inquirer.prompt ({
        type: "input",
        message: "What would you like to do?",
        name: "todo"
    }). then (({todo})=> {
        // add the new todo to our list of existing todos
        // package up a todo Object
        const todoObject = {
            title: todo,
            complete: false
        };
        // get the existing todos
        const todos = JSON.parse(fs.readFileSync ("todos.json", "utf-8"));
        // add the new todos and the old into a new list
        const updatedTodos = [...todos, todoObject]
        // write the new todo list to the file
        fs.writeFileSync("todos.json", JSON.stringify(updatedTodos, null, "\t",) , "utf-8");
        runTodoList ();
    });
}
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
const completeTodo = () => {
    console.clear();
     // get the existing todos
     const todos = JSON.parse(fs.readFileSync ("todos.json", "utf-8"));
    // which one do you want to complete?
    inquirer.prompt ({
        type: "list",
        name: "selectedTodo",
        message: "Which item did you complete?",
        choices: todos.map(todo =>todo.title),
    }).then (({selectedTodo})=> {
       
        // update the selected todo
        const updatedTodos = todos.map (todo => {
            const updatedTodo = {
                ...todo,
            }
            if (updatedTodo.title===selectedTodo) {
                updatedTodo.complete = true;
            }
            return updatedTodo;
        })
        // save the updated todos to the file
        fs.writeFileSync("todos.json", JSON.stringify(updatedTodos, null, "\t",) , "utf-8");
        runTodoList ();
    });
}
// Delete

const showOptions = ()=>{
inquirer.prompt ({
    type: "list",
    message: "What would you like to do?",
    name: "userChoice",
    choices: ["add new todo","complete a todo", "quit"],
})
.then (({userChoice}) => {
    switch (userChoice){
        case "complete a todo":
            return completeTodo();
        case "add new todo":
            return addNewTodo();
        case "quit":
            process.exit(0);
       
    }
});
};

const runTodoList = () => {
    // show existing todos
    showTodos();
    // show new todo input
 showOptions();
};


// Init
runTodoList ();
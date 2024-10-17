const express = require('express');
const app = express();

app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const tasks = [{id: 1, name: "Task 1", isDone: false}, {id: 2, name: "Task 2", isDone: false}];
let taskId = tasks.length;

//http://localhost:3000/tasks
app.get("/tasks", (request, response) => {
    response.json(tasks);
});

//http://localhost:3000/tasks/1
app.get("/tasks/:id", (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));

    if(task) {
        response.json(task);
    }
    else {
        response.status(404).send();
    }
});

app.post("/tasks", (request, response) => {
    taskId++;
    request.body.id = taskId;
    request.body.isDone = false;
    tasks.push(request.body);
    response.status(201).json();
});

app.patch("/tasks/:id", (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));

    if(task) {
        const {name, isDone} = request.body;

        if (name!== undefined) {
            task.name = name;
        }
        if (isDone !== undefined) {
            task.isDone = isDone;
        }
        response.json(task)
    }
    else {
        response.status(404).send(`Task not found`);
    }
});

app.delete("/tasks/:id", (request, response) => {
    const id = parseInt(request.params.id); 
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1);
        response.json(deletedTask[0]);
    } else {
        response.status(404).send("Task not found");
    }
});
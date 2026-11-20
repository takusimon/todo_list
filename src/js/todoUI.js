import { Inbox } from "./workspaces.js";
import { ProjectMasterList } from "./projects.js";

const makeInputBox = ()=>{
    const newTaskForm = document.createElement("form");
    newTaskForm.id = "new-task-form";
    const taskInput = document.createElement("input");

    taskInput.type = "text";
    taskInput.id = "task-input";
    taskInput.name = "task-input";
    taskInput.placeholder = "New Task Here";

    const addTaskBtn = document.createElement("button");
    

    newTaskForm.append(taskInput,addTaskBtn);

    return newTaskForm
}

export {makeInputBox};
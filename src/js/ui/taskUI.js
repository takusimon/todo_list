import { formatDistanceToNowStrict } from "date-fns";
import { taskMasterList } from "../logic/tasks.js";
import { returnProjectGivenID } from "../logic/projects.js";

import { makeProjectListPane } from "./projectUI.js";
import { appendTodoPane } from "./render.js";
import { makeContainer, makeElement } from "./utils.js";

const makeInputBox = ()=>{
    const newTaskForm = document.createElement("form");
    newTaskForm.id = "new-task-form";
    const taskInput = document.createElement("input");
    const taskDueDate = document.createElement("input");

    taskInput.type = "text";
    taskInput.id = "task-input";
    taskInput.name = "task-input";
    taskInput.placeholder = "New Task Here";
    taskInput.setAttribute('maxlength',35);
    taskInput.required = true;

    taskDueDate.type = "datetime-local";
    taskDueDate.name = "task-due-date";
    taskDueDate.id = "task-due-date";

    const prioritySelect = document.createElement("select");
    prioritySelect.options[prioritySelect.options.length] = new Option("🟥","red-flag");
    prioritySelect.options[prioritySelect.options.length] = new Option("🟨","yellow-flag");
    prioritySelect.options[prioritySelect.options.length] = new Option("🟦","blue-flag");
    prioritySelect.options[prioritySelect.options.length] = new Option("⬜","clear-flag",true,true);
    
    const dueDateContainer = makeContainer("due-date-container");
    dueDateContainer.append(taskDueDate,prioritySelect);

    newTaskForm.addEventListener('keydown',(event) => {
        if (event.code === "Enter"){
            event.preventDefault();
            const taskName = taskInput.value.trim();
            const taskDue = taskDueDate.value;
            const taskPriority = prioritySelect.value;
            const workspaceOrProject = returnProjectGivenID(newTaskForm);
            workspaceOrProject.addTaskToProject(taskName,taskDue,taskPriority);
            appendTodoPane(makeProjectListPane(workspaceOrProject));
            
        }
    })
    
    

    newTaskForm.append(taskInput,dueDateContainer);

    return newTaskForm
};

const makeTaskListMemeber = (task) => {
    const taskContainer = document.createElement("div")
    taskContainer.dataset.taskId = task.id;
    taskContainer.classList.add("task");
    taskContainer.dataset.priority = task.priority;
    const title = document.createElement("p");
    title.classList.add("task-title");
    title.textContent = task.title;

   
    const project = document.createElement("span");
    project.classList.add("task-project");
    if(task.project !== 'All' && task.project !== 'Inbox') {
        project.textContent = task.project;
   }
    const done = document.createElement("input");
    done.type = "checkbox";
    done.classList.add("task-done");
    done.checked = task.done;
    done.addEventListener('click',()=>{
        const proj = returnProjectGivenID(taskContainer);
        task.toggleDone();
        if (task.done){
            taskMasterList.addCompletedTasks(task);
            appendTodoPane(makeProjectListPane(proj));
        } else if (!task.done){
            taskMasterList.unCompleteTask(task);
            appendTodoPane(makeProjectListPane(proj));
        }
    })

    const dueDate = document.createElement("p");
    dueDate.classList.add("task-dueDate");
    if (task.dueDate){
        dueDate.textContent = formatDistanceToNowStrict(task.dueDate);
    }

    const deleteTaskBtn = makeElement("button");
    deleteTaskBtn.id = "delete-task";
    deleteTaskBtn.textContent = "X";
    deleteTaskBtn.addEventListener('click',()=>{
        const proj = returnProjectGivenID(taskContainer);
        taskMasterList.deleteSingleTask(task);
        appendTodoPane(makeProjectListPane(proj));
    });
    taskContainer.append(done,title,dueDate,project,deleteTaskBtn)

    return taskContainer;
};

export {makeInputBox,makeTaskListMemeber}
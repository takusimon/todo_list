import { ProjectMasterList, WorkspaceMasterList,returnProjectGivenID } from "./projects.js";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";

const makeInputBox = ()=>{
    const newTaskForm = document.createElement("form");
    newTaskForm.id = "new-task-form";
    const taskInput = document.createElement("input");
    const taskDueDate = document.createElement("input");

    taskInput.type = "text";
    taskInput.id = "task-input";
    taskInput.name = "task-input";
    taskInput.placeholder = "New Task Here";

    taskDueDate.type = "datetime-local";
    taskDueDate.name = "task-due-date";
    taskDueDate.id = "task-due-date";

    newTaskForm.addEventListener('keydown',(event) => {
        if (event.code === "Enter"){
            event.preventDefault();
            const taskName = taskInput.value.trim();
            const taskDue = taskDueDate.value;
            const workspaceOrProject = returnProjectGivenID(newTaskForm);
            workspaceOrProject.addTaskToProject(taskName,taskDue);
            appendTodoPane(makeProjectListPane(workspaceOrProject));
            
        }
    })
    
    

    newTaskForm.append(taskInput,taskDueDate);

    return newTaskForm
};

const makeTaskListMemeber = (task) => {
    const taskContainer = document.createElement("div")
    taskContainer.dataset.taskId = task.id;

    const title = document.createElement("p");
    title.classList.add("task-title");
    title.textContent = task.title;

    const priority = document.createElement("p");
    priority.classList.add("task-priority");
    priority.textContent = "blueflag";
    
    const project = document.createElement("span");
    project.classList.add("task-project");
    project.textContent = task.project;

    const done = document.createElement("input");
    done.type = "checkbox";
    done.classList.add("task-done");

    const dueDate = document.createElement("p");
    dueDate.classList.add("task-dueDate");
    if (task.dueDate){
        dueDate.textContent = formatDistanceToNowStrict(task.dueDate);
    }
    taskContainer.append(done,title,dueDate,priority,project)

    return taskContainer;
};

const workSpaceButtons = ()=> {
    const workspaces = WorkspaceMasterList.getWorkspaces();
    const allBtn = document.createElement("button");
    allBtn.id = "all";
    allBtn.classList.add("workspace");
    allBtn.textContent = "All";
    allBtn.addEventListener('click',() => {
        appendTodoPane(makeProjectListPane(workspaces[0]));
    })

    const inboxBtn = document.createElement("button");
    inboxBtn.id = "inbox";
    inboxBtn.classList.add("workspace");
    inboxBtn.textContent = "Inbox";
    inboxBtn.addEventListener('click',() => {
        appendTodoPane(makeProjectListPane(workspaces[1]));
    })

    return [allBtn,inboxBtn];
};

const makeContainer = (id) => {
    const container = document.createElement('div');
    container.id = id;

    return container;
}

function makeElement (type,elementClass=null) {
    const element = document.createElement(type);
    element.classList.add(elementClass);

    return element
}

function makeProjectListPane (project){
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("todo-pane-container");
    projectContainer.dataset.projectId = project.id;
    const projectName = document.createElement("h1");
    projectName.textContent = project.projectName;
    const taskForm = makeInputBox();
    const taskContainer = document.createElement("div");
    const projectTasks = project.getProjectTasks();
    for (let task of projectTasks){
     taskContainer.append(makeTaskListMemeber(task));
    }
    const completedProjectTasks = project.getCompletedTasks();
    const completedText = document.createElement("h2");
    completedText.textContent = "Completed";
    taskContainer.appendChild(completedText);

    for (let task of completedProjectTasks){
        taskContainer.append(makeTaskListMemeber(task));
    }

    projectContainer.append(projectName,taskForm,taskContainer);

    return projectContainer
};

function appendTodoPane (pane){
    const todoPane = document.querySelector(".todo-pane");
    todoPane.textContent = '';
    todoPane.append(pane);
}



export {workSpaceButtons}

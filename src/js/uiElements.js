import {formatDistanceToNow} from "date-fns";
import { taskMasterList } from "./tasks.js";
import { ProjectMasterList, WorkspaceMasterList } from "./projects.js";

const makeInputBox = ()=>{
    const newTaskForm = document.createElement("form");
    newTaskForm.id = "new-task-form";
    const taskInput = document.createElement("input");

    taskInput.type = "text";
    taskInput.id = "task-input";
    taskInput.name = "task-input";
    taskInput.placeholder = "New Task Here";

    newTaskForm.addEventListener('keydown',(event) => {
        if (event.code === "Enter"){
            event.preventDefault();
            const projectbyID = taskInput.closest('[data-project-id]');
            const workspaceIndex = WorkspaceMasterList.findWorkspace(projectbyID.dataset.projectId);
            const taskName = taskInput.value.trim();
            const projectIndex = ProjectMasterList.findProject(projectbyID.dataset.projectId);
            if (workspaceIndex >= 0){
                const workspace =WorkspaceMasterList.getWorkspaces()[workspaceIndex];
                workspace.addTaskToProject(taskName);
                appendTodoPane(makeProjectListPane(workspace));
            }
        }
    })
    
    

    newTaskForm.append(taskInput,);

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
    dueDate.textContent = task.date;

    taskContainer.append(done,title,dueDate,priority,project)

    return taskContainer;
};

const workSpaceButtons = ()=> {
    const todoPane = document.querySelector(".todo-pane")
    const workspaces = WorkspaceMasterList.getWorkspaces();
    const allBtn = document.createElement("button");
    allBtn.id = "all";
    allBtn.classList.add("workspace");
    allBtn.textContent = "All";

    const inboxBtn = document.createElement("button");
    inboxBtn.id = "inbox";
    inboxBtn.classList.add("workspace");
    inboxBtn.textContent = "Inbox";
    inboxBtn.addEventListener('click',() => {
        todoPane.textContent = '';
       todoPane.appendChild(makeProjectListPane(workspaces[1]))
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

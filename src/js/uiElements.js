import {formatDistanceToNow} from "date-fns";


const makeInputBox = ()=>{
    const newTaskForm = document.createElement("form");
    newTaskForm.id = "new-task-form";
    const taskInput = document.createElement("input");

    taskInput.type = "text";
    taskInput.id = "task-input";
    taskInput.name = "task-input";
    taskInput.placeholder = "New Task Here";


    
    

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
    title.textContent = showPriority(task.priority);
    
    const project = document.createElement("span");
    project.classList.add("task-project");
    project.textContent = showProjectName(task.project);

    const done = document.createElement("input");
    done.type = "checkbox";
    done.classList.add("task-done");

    const dueDate = document.createElement("p");
    date.classList.add("task-dueDate");
    dueDate.textContent = formatDistanceToNow(task.date) ?? null;

    taskContainer.append(done,title,dueDate,priority,project)

    return taskContainer;
};

const workSpaceButtons = ()=> {
    const allBtn = document.createElement("button");
    allBtn.id = "all";
    allBtn.classList.add("workspace");
    allBtn.textContent = "All";

    const inboxBtn = document.createElement("button");
    inboxBtn.id = "inbox";
    inboxBtn.classList.add("workspace");
    inboxBtn.textContent = "Inbox";

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

const makeProjectListMember = (project) => {
    const projectContainer = document.createElement("section");
    projectContainer.classList.add("todo-pane");
    const projectName = document.createElement("h1");
    projectName.textContent = project.projectName || project.name();
    const taskForm = newTaskForm();
    // const taskContainer =
};




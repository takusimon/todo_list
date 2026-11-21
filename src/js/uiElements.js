import { ProjectMasterList, WorkspaceMasterList,returnProjectGivenID } from "./projects.js";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { taskMasterList } from "./tasks.js";

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

    const prioritySelect = document.createElement("select");
    prioritySelect.options[prioritySelect.options.length] = new Option("🟥","red-flag");
    prioritySelect.options[prioritySelect.options.length] = new Option("🟨","yellow-flag");
    prioritySelect.options[prioritySelect.options.length] = new Option("🟦","blue-flag");
    prioritySelect.options[prioritySelect.options.length] = new Option("⬜","clear-flag",true,true);
    


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
    
    

    newTaskForm.append(taskInput,taskDueDate,prioritySelect);

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
    if (task.priority !== "NONE"){
        priority.textContent = task.priority;
    }
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

function makeElement (type) {
    const element = document.createElement(type);


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

const makeNewProjectsButton = () => {
    const projectTitle = makeElement("p");
    const newProjectContainer = makeContainer('new-project-container');
    const projectsContainer = makeContainer('project-container');
    const projectButtonContainer = makeContainer('project-button-container')
    projectTitle.id = "project-title";
    projectTitle.textContent = "Projects";

    const projectDialogue = makeElement("dialog");
    projectDialogue.id = "new-project dialogue";

    const newProjectForm = makeElement("form");
    newProjectForm.id = "new-project-form";

    const newProjectInput = makeElement("input");
    newProjectInput.type = "text";
    newProjectInput.id = "new-project-input";
    newProjectInput.placeholder = "Project Name";
    newProjectForm.append(newProjectInput);

    const cancelBtn = makeElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener('click',() =>{
        newProjectForm.reset();
        projectDialogue.close()});

    const addProjBtn = makeElement("button");
    addProjBtn.textContent = "Add";
    addProjBtn.htmlFor = "new-project-form";
    addProjBtn.addEventListener('click',(event) => {
        event.preventDefault();
        if (newProjectInput.value){
            const projButton = makeElement("button");
            const project = ProjectMasterList.createProjects(newProjectInput.value.trim());
            ProjectMasterList.appendProject(project);
            projButton.textContent = project.projectName;
            projButton.addEventListener('click',()=>{
                appendTodoPane(makeProjectListPane(project))
            });
            projectButtonContainer.append(projButton);
            projectButtonContainer.dataset.projectId = project.id;
            projectsContainer.appendChild(projectButtonContainer);
            deleteProjectButton(project);
            newProjectForm.reset();
            projectDialogue.close();
        }else {
            alert("Project must have a name!")
        }
    })

    projectDialogue.append(newProjectForm,cancelBtn,addProjBtn);

    const addProjectBtn = makeContainer("button");
    addProjectBtn.textContent = "➕";

    addProjectBtn.addEventListener('click',() =>{
        projectDialogue.showModal();
    })

    function deleteProjectButton(project){
        const projectContainer = document.querySelector(`[data-project-id="${project.id}"]`);
        const deleteProject = makeElement("button");
        deleteProject.textContent = "X";
        deleteProject.addEventListener('click',()=>{
            ProjectMasterList.deleteProject(project.id);
            projectContainer.remove();
            const projectTasks = [].concat(project.getProjectTasks(),project.getCompletedTasks());
            for (let i = 0;i < projectTasks.length; i++){
                taskMasterList.deleteTask(project.id);
            }
            customClickEvent();
        })
        projectContainer.appendChild(deleteProject);
    }

    newProjectContainer.append(projectTitle,addProjectBtn,projectDialogue,projectsContainer);

    return newProjectContainer

}

function appendTodoPane (pane){
    const todoPane = document.querySelector(".todo-pane");
    todoPane.textContent = '';
    todoPane.append(pane);
}
function customClickEvent (){
    const inboxBtn = document.querySelector("#inbox");
    let event = new Event('click');
    inboxBtn.dispatchEvent(event);
}


export {workSpaceButtons,makeElement,makeContainer,makeNewProjectsButton}

import { ProjectMasterList } from "../logic/projects.js";
import { taskMasterList } from "../logic/tasks.js";

import { makeInputBox, makeTaskListMemeber } from "./taskUI.js";
import { makeElement, makeContainer, clearTaskOverview } from "./utils.js";
import { appendTodoPane,inboxCustomClickEvent } from "./render.js";

export function makeProjectListPane (project){
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("todo-pane-container");
    projectContainer.dataset.projectId = project.id;
    const projectName = document.createElement("h1");
    projectName.textContent = project.projectName;
    const taskForm = makeInputBox();
    const taskContainer = document.createElement("div");
    taskContainer.id = "task-container";
    const projectTasks = project.getProjectTasks();
    for (let task of projectTasks){
     taskContainer.append(makeTaskListMemeber(task));
    }
    const completedProjectTasks = project.getCompletedTasks();
    const completedText = document.createElement("h2");
    if (project.getCompletedTasks().length > 0){
    completedText.textContent = "Completed";
    taskContainer.appendChild(completedText);
    }
    for (let task of completedProjectTasks){
        taskContainer.append(makeTaskListMemeber(task));
    }

    projectContainer.append(projectName,taskForm,taskContainer);

    return projectContainer
};

export const makeNewProjectsButton = () => {
    const projectTitle = makeElement("p");
    const titleContainer = makeContainer('title-container');
    const newProjectContainer = makeContainer('new-project-container');
    const projectsContainer = makeContainer('project-container');
    projectTitle.id = "project-title";
    projectTitle.textContent = "Projects";

    const projectDialogue = makeElement("dialog");
    projectDialogue.id = "new-project-dialog";

    const newProjectForm = makeElement("form");
    newProjectForm.id = "new-project-form";

    const newProjectLabel = makeElement("label");
    newProjectLabel.htmlFor = "new-project-input";
    newProjectLabel.textContent = "New Project";
    newProjectLabel.classList.add('project-label');

    const projectInputContainer = makeContainer("project-input-container");
    const newProjectInput = makeElement("input");
    newProjectInput.type = "text";
    newProjectInput.id = "new-project-input";
    newProjectInput.placeholder = "Project Name";
    projectInputContainer.append(newProjectLabel,newProjectInput);
    newProjectForm.append(projectInputContainer);

    const cancelBtn = makeElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("dialog-btn");
    cancelBtn.id = "cancel-btn";
    cancelBtn.addEventListener('click',() =>{
        newProjectForm.reset();
        projectDialogue.close()});

    const addProjBtn = makeElement("button");
    addProjBtn.textContent = "Add";
    addProjBtn.htmlFor = "new-project-form";
    addProjBtn.classList.add('dialog-btn');
    addProjBtn.id = "add-btn";

    addProjBtn.addEventListener('click',(event) => {
        event.preventDefault();
        if (newProjectInput.value){
            const projButton = makeElement("button");
            projButton.classList.add('project');
            const project = ProjectMasterList.createProjects(newProjectInput.value.trim());
            const projectButtonContainer = makeContainer(`${project.projectName}`);
            ProjectMasterList.appendProject(project);
            projButton.textContent = project.projectName;
            projButton.addEventListener('click',()=>{
                appendTodoPane(makeProjectListPane(project))
                clearTaskOverview();
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
    const dialogBtnContainer = makeContainer('dialog-btn-container');
    dialogBtnContainer.append(cancelBtn,addProjBtn);
    projectDialogue.append(newProjectForm,dialogBtnContainer);

    const addProjectBtnExterior = makeElement("button");
    addProjectBtnExterior.id = "add-project-btn";
    addProjectBtnExterior.textContent = "+";

    addProjectBtnExterior.addEventListener('click',() =>{
        projectDialogue.showModal();
    })

    function deleteProjectButton(project){
        const projectContainer = document.querySelector(`[data-project-id="${project.id}"]`);
        projectContainer.classList.add('prject-buttons')
        const deleteProject = makeElement("button");
        deleteProject.textContent = "X";
        deleteProject.classList.add('delete-proj');
        deleteProject.addEventListener('click',()=>{
            const confirmDelete = confirm("The Project and All It's Tasks Will Be Erased!")
            if (confirmDelete){
                ProjectMasterList.deleteProject(project.id);
                projectContainer.remove();
                const projectTasks = [].concat(project.getProjectTasks(),project.getCompletedTasks());
                for (let i = 0;i < projectTasks.length; i++){
                    taskMasterList.deleteAllTask(project.id);
                }
                inboxCustomClickEvent();
            } else {
                return;
            }
            })
        projectContainer.appendChild(deleteProject);
    }
    titleContainer.append(projectTitle,addProjectBtnExterior);
    newProjectContainer.append(titleContainer,projectDialogue,projectsContainer);

    return newProjectContainer

};
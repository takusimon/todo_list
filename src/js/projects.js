import {taskMasterList} from "./tasks.js";

class CreateProject{
    constructor(name,){
        this.projectName = name;
        
    }
    #id = crypto.randomUUID();
    
    get id(){
        return this.#id;
    }
    
    deleteTaskFromProject (taskid) {
        taskMasterList.deleteTask(taskid);
    }

    addTaskToProject (name,dueDate=null,priority=null){
        const task = taskMasterList.createTask(name,dueDate,priority);
        task.projectID = this.id;
        task.project = this.projectName;

        taskMasterList.appendTask(task);
    }

    getProjectTasks (){
        const projectFilter = filterByActive(this.projectName, this.id);

        return taskMasterList.getAllTasks().filter(projectFilter);
    }

    getCompletedTasks(){
        const projectFilter = filterByComplete(this.projectName, this.id);

        return taskMasterList.getCompletedTasks().filter(projectFilter);
    }
}

function filterByActive(projectName,projectId){
    switch (projectName) {
        case "All":
            return task => task.done === false;

        default:
            return task =>
                task.projectID === projectId && task.done === false;
    }
}

function filterByComplete(projectName,projectId){
    switch (projectName) {
        case "All":
            return task => task.done === true;

        default:
            return task =>
                task.projectID === projectId && task.done === true;
    }
}

const Inbox = new CreateProject("Inbox");
const All = new CreateProject("All");

const  ProjectMasterList = (()=>{
    const allProjects = [];
    const appendProject = (project) => allProjects.push(project);
    const findProject = (id) => allProjects.findIndex(project => project.id === id);
    const deleteProject = (projectId) => {
            const projectIndex = findProject(projectId);
            allProjects.splice(projectIndex,1);
    }

    const getProjects = () => [...allProjects];

    const createProjects = (name) => new CreateProject(name);
    

    return {appendProject,deleteProject,getProjects,createProjects,findProject};
})();

const  WorkspaceMasterList = (()=>{
    const allProjects = [All,Inbox];
    
    const getWorkspaces = () => [...allProjects];

    const findWorkspace = (id) => allProjects.findIndex(project => project.id === id);

    return {getWorkspaces,findWorkspace};
})();

function returnProjectGivenID(element){
    const closestProjectID = element.closest('[data-project-id]');
    const workspaceIndex = WorkspaceMasterList.findWorkspace(closestProjectID.dataset.projectId);
    const projectIndex = ProjectMasterList.findProject(closestProjectID.dataset.projectId);
    
    if (workspaceIndex >= 0) {
        return WorkspaceMasterList.getWorkspaces()[workspaceIndex];
    } else if (projectIndex >= 0) {
        return ProjectMasterList.getProjects()[projectIndex];
    }
}

export {ProjectMasterList,WorkspaceMasterList,returnProjectGivenID}
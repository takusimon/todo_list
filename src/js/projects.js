import {taskMasterList} from "./tasks.js";

class CreateProject{
    constructor(name,){
        this.projectName = name;
        
    }
    #id = crypto.randomUUID();
    
    get id(){
        return this.#id;
    }
    
    deleteTaskFromProject (task) {
        taskMasterList.deleteTask(task);
    }

    addTaskToProject (name,dueDate=null,priority=null){
        const task = taskMasterList.createTask(name,dueDate,priority);
        task.project = this.id;

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
                task.project === projectId && task.done === false;
    }
}

function filterByComplete(projectName,projectId){
    switch (projectName) {
        case "All":
            return task => task.done === true;

        default:
            return task =>
                task.project === projectId && task.done === true;
    }
}

const Inbox = new CreateProject("Inbox","workspace");
const All = new CreateProject("All","workspace");

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

export {ProjectMasterList,WorkspaceMasterList}
import {taskMasterList} from "./tasks.js";

class CreateProject{
    constructor(name){
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
        const task = createTask(name,dueDate,priority);
        task.project = this.id;

        taskMasterList.addTask(task);
    }

    getProjectTasks (){
        const projectFilter = filterByActive(this.projectName);
        const tasks = taskMasterList.getAllTasks().filter(projectFilter);
        return [...tasks].sort(taskMasterList.sortTasks);
    }

    getCompletedTasks(){
        const projectFilter = filterByComplete(this.projectName);
        const completedTasks = taskMasterList.getCompletedTasks().filter(projectFilter);
        return [...completedTasks].sort(taskMasterList.sortTasks);
    }
}

function filterByActive(projectName){
    switch (projectName){
        case "Inbox":
            return task => task.project === "Inbox" && task.done === false;
        case "All":
            return task => task.done === false;
        default:
            return task => task.project === this.id && task.done === false;
    }
}

function filterByComplete(projectName){
    switch (projectName){
        case "Inbox":
            return task => task.project === "Inbox" && task.done === true;
        case "All":
            return task => task.done === true;
        default:
            return task => task.project === this.id && task.done === true;
    }
}

const Inbox = new CreateProject("Inbox");
const All = new CreateProject("All");

const  ProjectMasterList = (()=>{
    const allProjects = [];
    const appendProject = (project) => allProjects.push(project);

    const deleteProject = (project) => {
            const projectID = project.id;
            const projectIndex = allProjects.findIndex(project => project.id === projectID);
            allProjects.splice(projectIndex,1);
    }

    const getProjects = () => [...allProjects];

    const createProjects = (name) => new CreateProject(name);
    const findProject = (id) => allProjects.findIndex(project => project.id === id);

    return {appendProject,deleteProject,getProjects,createProjects,findProject};
})();

const  WorkspaceMasterList = (()=>{
    const allProjects = [All,Inbox];
    
    const getWorkspaces = () => [...allProjects];

    const findWorkspace = (id) => allProjects.findIndex(project => project.id === id);

    return {getWorkspaces,findWorkspace};
})();

export {ProjectMasterList,WorkspaceMasterList}
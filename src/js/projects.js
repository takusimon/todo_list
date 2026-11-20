import { createTask,taskMasterList,sortTasks} from "./tasks.js";

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
        const tasks = taskMasterList.getAllTasks().filter(task => task.project === this.id);
        return [...tasks].sort(sortTasks);
    }

    getCompletedTasks(){
        const completedTasks = taskMasterList.getCompletedTasks().filter(task => task.project === this.id);
        return [...completedTasks].sort(sortTasks);
    }
}



const  ProjectMasterList = (()=>{
    const allProjects = [];
    const appendProject = (project) => allProjects.push(project);

    const deleteProject = (project) => {
            const projectID = project.id;
            const projectIndex = allProjects.findIndex(project => project.id === projectID);
            allProjects.slice(projectIndex,1);
    }

    const getProjects = () => [...allProjects];

    const createProjects = (name) => new CreateProject(name);
    const findProject = (id) => allProjects.findIndex(project => project.id === id);

    return {appendProject,deleteProject,getProjects,createProjects,findProject};
})();

export {ProjectMasterList}
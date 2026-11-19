import { createTask,taskMasterList,sortTasks} from "./tasks.js";

class CreateProject{
    constructor(name){
        this.projectName = name;
        this.id = crypto.randomUUID();
    }

    #taskList = taskMasterList.getTasks().filter(task => task.project === this.projectName);

    #completedTasks = taskMasterList.getCompletedTasks().filter(task => task.project === this.projectName)
    
    deleteTaskFromProject (task) {
        taskMasterList.deleteTask(task);
    }

    addTaskToProject (name,dueDate=null,priority=null){
        const task = createTask(name,dueDate,priority);
        task.project = this.projectName;

        taskMasterList.addTask(task);
    }

    getProjectTasks (){
        return [...this.#taskList].sort(sortTasks);
    }

    getCompletedTasks(){
        return [...this.#completedTasks].sort(sortTasks);
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

    return {appendProject,deleteProject,getProjects,createProjects};
})();

export {ProjectMasterList}
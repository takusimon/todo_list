import { createTask} from "./tasks.js";

function Project(name){
    const getProjectName = () => name;
    const taskList = [];
    const completedTasks = [];

    const getTasks = () => [...taskList];
    const getCompletedTasks = () => [...completedTasks];

    const addTask = (task) => taskList.unshift(task);

    const deleteTask = (index) => taskList.splice(index,1);
    const moveCompletedTasks = (index) => {
        const [completedTask] = taskList.splice(index,1);
        completedTasks.unshift(completedTask);
    };

    return {getTasks,addTask,deleteTask,getCompletedTasks,moveCompletedTasks,createTask,getProjectName};
}

const inbox = Project("Inbox");

export default (()=>{
    const projects = [inbox,];

    const appendProject = (project) => projects.push(project);

    const deleteProject = (index) => {
        if (index === 0){
            return
        }
        else {
            projects.slice(index,1);
        }
    }

    const getProjects = () => [...projects];

    const createProject = (name) => Project(name);

    return {appendProject,deleteProject,getProjects,createProject};
})();
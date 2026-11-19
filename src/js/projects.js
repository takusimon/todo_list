import { createTask} from "./tasks.js";

function createProject(name){
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



const  Projects = (()=>{
    const allProjects = [];
    const appendProject = (project) => allProjects.push(project);

    const deleteProject = (index) => {
            allProjects.slice(index,1);
    }

    const getProjects = () => [...allProjects];

    const createProjects = (name) => createProject(name);

    return {appendProject,deleteProject,getProjects,createProjects};
})();

const workSpaces = (()=> {
    const inbox = createProject("Inbox");
    const myDay = createProject("My day");
    const upComing = createProject("Upcoming");
    const completed = createProject("Completed")
})
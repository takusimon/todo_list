import { taskMasterList,createTask,sortTasks } from "./tasks.js";

function deleteTask (task){
    taskMasterList.deleteTask(task);
}

function addTasktoWorkspace (name,dueDate=null,priority=null){
    const task = createTask(name,dueDate,priority);
    taskMasterList.addTask(task);
}

function addTasktoTodayWorkSpace (name,dueDate=null,priority=null){
    const task = createTask(name,dueDate,priority);
    const date = new Date();
    if (!dueDate){
        task.dueDate = date;
    }

    taskMasterList.addTask(task);
}

const Inbox = (()=> {
    let taskList = [];
    let completedTasks = [];

    const getFilteredtasks = () => {
        taskList = [];
        taskList = taskMasterList.getAllTasks().filter(task => task.project === "");
    }
})();

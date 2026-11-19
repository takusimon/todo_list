export function Project(name){
    const taskList = [];
    const completedTasks = [];

    const getTasks = () => taskList;
    const getCompletedTasks = () => completedTasks;

    const addTask = (task) => taskList.unshift(task);

    const deleteTask = (index) => taskList.splice(index,1);
    const moveCompletedTasks = (index) => {
        const [completedTask] = taskList.splice(index,1);
        completedTasks.unshift(completedTask);
    }

    return {getTasks,addTask,deleteTask,getCompletedTasks,moveCompletedTasks};
}

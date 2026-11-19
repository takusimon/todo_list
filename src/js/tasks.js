export class Task {
    constructor(title,dueDate=null,priority=null,project=null){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.note = "";
        this.done = "";
    }

    get note(){
        return this._note;
    }

    set note(text){
        if (this._note){
            this._note += ` ${text}`;
        } else {
            this._note = text;
        }
    }

    get done(){
        return this._done;
    }

    set done(state){
        this._done = state;
    }
}

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

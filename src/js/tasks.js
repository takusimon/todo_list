class Task {
    constructor(title){
        this.title = title;
        this.dueDate = "";
        this.priority = "";
        this.project = ""
        this.note = "";
        this.done = false;
        this.id = crypto.randomUUID();
    }
    get title(){
        return this._title;
    }
    
    set title(text){
        this._title = text;
    }

    get dueDate(){
        return this._dueDate;
    }

    set dueDate(datestring){
        this._dueDate = getDate(datestring) ?? null;
    }

    get priority(){
        return this._priority;
    }

    set priority(priorityState){
        this._priority = setPriority(priorityState);
    }

    get project(){
        return this._project;
    }
    
    set project(projectName){
        this._project = projectName;
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

    toggleDone (){
        this.done = ~this.done;
    }
}

function setPriority(priorityFlag){
    switch (priorityFlag){
        case "red-flag":
            return "HIGH";
        case "yellow-flag":
            return "MED";
        case "blue-flag":
            return "LOW";
        case "clear-flag":
        default:
            return "NONE";
    }
}

function getDate(datestring){
    if (datestring instanceof Date){
        return datestring;
    }

    if (datestring){
        const [a,b,c] = datestring.split("-");

        return new Date(a,b-1,c);
    };

    return
}





const taskMasterList = (()=>{
    const allTasks = [];
    const allCompletedTasks = [];

    const getAllTasks = () => [...allTasks].sort(sortTasks);
    
    const getCompletedTasks = ()=> [...allCompletedTasks].sort(sortTasks);
    
    const appendTask = (task) => allTasks.push(task);
    
    const deleteTask = (taskToDel) => {
        const taskID = taskToDel.id;

        const taskIndex = allTasks.findIndex((task) => task.id === taskID)
        allTasks.splice(taskIndex,1);

    }

    const addCompletedTasks = (task) => {
        if (task.done){
        const [completed] = deleteTask(task);
        allCompletedTasks.push(completed);
        }
    }

    function createTask(title,dueDate=null,priority=null){
    const task = new Task(title);
    task.dueDate = dueDate;
    task.priority = priority;

    return task;
    }

    function sortTasks(task1,task2){
    if (task1.dueDate === null) return 1;
    if (task2.dueDate === null) return -1;

    return task1.dueDate-task2.dueDate
    }

    return {getAllTasks,appendTask,deleteTask,addCompletedTasks,getCompletedTasks,createTask,sortTasks};
})();

export {taskMasterList};
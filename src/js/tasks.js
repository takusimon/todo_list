class Task {
    constructor(title){
        this.title = title;
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
         if (datestring instanceof Date){
            this._dueDate = datestring;
            return;
        }
        if (datestring){
            this._dueDate = new Date(datestring);
            return;
        }
        this._dueDate = null;
    }

    get priority(){
        return this._priority;
    }

    set priority(priorityFlag){
        switch (priorityFlag){
        case "red-flag":
            this._priority = "🟥";
            break;
        case "yellow-flag":
            this._priority = "🟨";
            break;
        case "blue-flag":
            this._priority = "🟦";
            break;
        case "clear-flag":
            this._priority = "NONE";
            break;
    }
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
        this.done = !this.done;
    }
    
}


const taskMasterList = (()=>{
    const allTasks = [];
    const allCompletedTasks = [];

    const getAllTasks = () => [...allTasks].sort(sortTasks);
    
    const getCompletedTasks = ()=> [...allCompletedTasks].sort(sortTasks);
    
    const appendTask = (task) => allTasks.push(task);
    
    const deleteTask = (taskid) => {
        const taskIndex = allTasks.findIndex((task) => task.id === taskid)
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
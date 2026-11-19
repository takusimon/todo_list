class Task {
    constructor(title){
        this.title = title;
        this.dueDate = "";
        this.priority = "";
        this.project = ""
        this.note = "";
        this.done = false;
        this.id = crypto.randomUUID;
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

function markDone(task){
    task.done = !task.done;

    return task;
}

function getDate(datestring){
    if (datestring){
        const [a,b,c] = datestring.split("-");

        return new Date(a,b-1,c);
    };

    return
}

export function createTask(title,dueDate=null,priority=null){
    const task = new Task(title);
    task.dueDate = dueDate;
    task.priority = priority;

    return task;
}


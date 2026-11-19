class Task {
    constructor(title){
        this.title = title;
        this.dueDate = "";
        this.priority = "";
        this.project = ""
        this.note = "";
        this.done = "";
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
    if (task.done){
        task.done = false;
    } else {
        task.done = true;
    }

    return task;
}

function getDate(datestring){
    if (datestring){
        const [a,b,c] = datestring.split("-");

        return new Date(a,b,c);
    };

    return
}

export function CreateTask(title,dueDate=null,priority=null){
    const task = new Task(title);
    task.dueDate = dueDate;
    this.priority = priority;
}


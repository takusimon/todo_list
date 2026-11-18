export class Task {
    constructor(title,dueDate=null,priority=null){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
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

import {taskMasterList} from "./tasks.js";
import { ProjectMasterList,WorkspaceMasterList } from "./projects.js";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
function saveTasks(){
    if (storageAvailable("localStorage")){
        const tasks = [].concat(taskMasterList.getAllTasks(),taskMasterList.getCompletedTasks());
        localStorage.setItem("tasks",JSON.stringify(tasks));
        console.log("Tasks Saved");
    } else {
        return;
    }
}

function loadTasks () {
    if (storageAvailable("localStorage")){
        const retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
        
        for (let task of retrievedTasks){
            const restoredTask = taskMasterList.createTask(task._title,task._dueDate,task._priority);
            restoredTask.done = task.done;
            restoredTask.id = task.id;
            restoredTask.projectID = task._projectID;
            restoredTask.project = task._project;
            restoredTask.description = task._description;
            restoredTask.note = task._note;
            !restoredTask.done ? taskMasterList.appendTask(restoredTask):taskMasterList.appendCompleted(restoredTask);
        }
        console.log("Tasks Restored");
    }
}

export {saveTasks,loadTasks}
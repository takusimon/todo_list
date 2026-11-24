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

function saveProjects(){
    if(storageAvailable("localStorage")){
        const projects = ProjectMasterList.getProjects();
        localStorage.setItem("projects",JSON.stringify(projects));
    } else {
        return;
    }
}

function loadProjects () {
    if(storageAvailable("localStorage")){
        const retrievedProjects = JSON.parse(localStorage.getItem("projects"));

        for (let project of retrievedProjects){
            const restoredProject = ProjectMasterList.createProjects(project.projectName,project._id);
            ProjectMasterList.appendProject(restoredProject);
        }
    }
}

export {saveTasks,loadTasks,saveProjects,loadProjects};
import "../css/reset.css";
import "../css/style.css";

import domMaker from "./uiElements.js";
import { Inbox } from "./workspaces.js";
import { ProjectMasterList } from "./projects.js";

const projectPane = (()=>{
    const projectOverview = document.querySelector(".project-overview");
    const todoPane = document.querySelector(".todo-pane");
    const workspaceContainer = domMaker.makeContainer("workspace-container");
    const [all,inbox] = domMaker.workSpaceButtons();
    inbox.addEventListener('click',() => {
        todoPane.textContent = "";
        const taskContainer = domMaker.makeContainer("task-container");
        const tasks = Inbox.getFilteredtasks();
        for(let task of tasks){
            taskContainer.appendChild(domMaker.makeTaskListMemeber(task));
        }

        todoPane.append(domMaker.makeInputBox(),taskContainer);

    })
    workspaceContainer.append(all,inbox);

    projectOverview.append(workspaceContainer);
})();



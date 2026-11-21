import { WorkspaceMasterList } from "../logic/projects.js";

import { makeProjectListPane } from "./projectUI.js";
import { appendTodoPane } from "./render.js";

export const workSpaceButtons = ()=> {
    const workspaces = WorkspaceMasterList.getWorkspaces();
    const allBtn = document.createElement("button");
    allBtn.id = "all";
    allBtn.classList.add("workspace");
    allBtn.textContent = "All";
    allBtn.addEventListener('click',() => {
        appendTodoPane(makeProjectListPane(workspaces[0]));
    })

    const inboxBtn = document.createElement("button");
    inboxBtn.id = "inbox";
    inboxBtn.classList.add("workspace");
    inboxBtn.textContent = "Inbox";
    inboxBtn.addEventListener('click',() => {
        appendTodoPane(makeProjectListPane(workspaces[1]));
    })

    return [allBtn,inboxBtn];
};

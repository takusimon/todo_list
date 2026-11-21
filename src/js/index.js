import "../css/reset.css";
import "../css/style.css";

import {workSpaceButtons,makeElement, makeContainer, makeNewProjectsButton} from "./uiElements.js";

const projectPane = (()=>{
    const projectOverview = document.querySelector(".project-overview");
    
    const workspaceContainer = makeContainer("workspace-container");
    const [allBtn,inboxBtn] = workSpaceButtons();
    workspaceContainer.append(allBtn,inboxBtn);
    
    

    projectOverview.append(workspaceContainer,makeNewProjectsButton());
})();



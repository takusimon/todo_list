import "../css/reset.css";
import "../css/style.css";

import { makeInputBox,makeTaskListMemeber,workSpaceButtons,makeContainer,makeElement} from "./uiElements.js";

const projectPane = (()=>{
    const projectOverview = document.querySelector(".project-overview");
    const workspaceContainer = makeContainer("workspace-container");
    const [all,inbox] = workSpaceButtons();
    workspaceContainer.append(all,inbox);

    projectOverview.append();
})();



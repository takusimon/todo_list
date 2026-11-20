import "../css/reset.css";
import "../css/style.css";

import {workSpaceButtons} from "./uiElements.js";

const projectPane = (()=>{
    const projectOverview = document.querySelector(".project-overview");
    const [allBtn,inboxBtn] = workSpaceButtons();
    


    projectOverview.append(allBtn,inboxBtn);
})();



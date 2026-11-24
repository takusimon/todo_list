import "../css/reset.css";
import "../css/style.css";

import { workSpaceButtons } from "./ui/workspaceUI.js";
import { makeNewProjectsButton, projectButtonMaker } from "./ui/projectUI.js";
import { makeElement, makeContainer } from "./ui/utils.js";
import { inboxCustomClickEvent } from "./ui/render.js";
import { loadProjects, loadTasks } from "./logic/localstore.js";
import { ProjectMasterList } from "./logic/projects.js";

const projectPane = (() => {
  const projectOverview = document.querySelector(".project-overview");
  loadTasks();
  loadProjects();
  const workspaceContainer = makeContainer("workspace-container");
  const [allBtn, inboxBtn] = workSpaceButtons();
  workspaceContainer.append(allBtn, inboxBtn);

  projectOverview.append(workspaceContainer, makeNewProjectsButton());
  const currentProjects = ProjectMasterList.getProjects();
  for (let project of currentProjects){
    projectButtonMaker(project);
  }
  inboxCustomClickEvent();
})();

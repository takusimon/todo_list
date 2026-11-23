import "../css/reset.css";
import "../css/style.css";

import { workSpaceButtons } from "./ui/workspaceUI.js";
import { makeNewProjectsButton } from "./ui/projectUI.js";
import { makeElement, makeContainer } from "./ui/utils.js";
import { inboxCustomClickEvent } from "./ui/render.js";
import { loadTasks } from "./logic/localstore.js";

const projectPane = (() => {
  const projectOverview = document.querySelector(".project-overview");
  loadTasks();
  const workspaceContainer = makeContainer("workspace-container");
  const [allBtn, inboxBtn] = workSpaceButtons();
  workspaceContainer.append(allBtn, inboxBtn);

  projectOverview.append(workspaceContainer, makeNewProjectsButton());
  inboxCustomClickEvent();
})();

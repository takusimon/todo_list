import { ProjectMasterList } from "../logic/projects.js";

export function appendTodoPane(pane) {
  const todoPane = document.querySelector(".todo-pane");
  todoPane.textContent = "";
  todoPane.append(pane);
}
export function inboxCustomClickEvent() {
  const inboxBtn = document.querySelector("#inbox");
  let event = new Event("click");
  inboxBtn.dispatchEvent(event);
}

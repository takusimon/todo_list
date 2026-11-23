import { formatDistanceToNowStrict } from "date-fns";
import { taskMasterList } from "../logic/tasks.js";
import { saveTasks } from "../logic/localstore.js";
import {
  ProjectMasterList,
  returnProjectGivenID,
  WorkspaceMasterList,
} from "../logic/projects.js";

import { makeProjectListPane } from "./projectUI.js";
import { appendTodoPane } from "./render.js";
import { clearTaskOverview, makeContainer, makeElement } from "./utils.js";

const makeInputBox = () => {
  const newTaskForm = document.createElement("form");
  newTaskForm.id = "new-task-form";
  const taskInput = document.createElement("input");
  const taskDueDate = document.createElement("input");
  taskInput.required = true;

  taskInput.type = "text";
  taskInput.id = "task-input";
  taskInput.name = "task-input";
  taskInput.placeholder = "New Task Here";
  taskInput.setAttribute("maxlength", 35);
  taskInput.required = true;

  taskDueDate.type = "datetime-local";
  taskDueDate.name = "task-due-date";
  taskDueDate.id = "task-due-date";

  const prioritySelect = document.createElement("select");
  prioritySelect.options[prioritySelect.options.length] = new Option(
    "🟥",
    "red-flag",
  );
  prioritySelect.options[prioritySelect.options.length] = new Option(
    "🟨",
    "yellow-flag",
  );
  prioritySelect.options[prioritySelect.options.length] = new Option(
    "🟦",
    "blue-flag",
  );
  prioritySelect.options[prioritySelect.options.length] = new Option(
    "⬜",
    "clear-flag",
    true,
    true,
  );

  const dueDateContainer = makeContainer("due-date-container");
  dueDateContainer.append(taskDueDate, prioritySelect);

  newTaskForm.addEventListener("keydown", (event) => {
    if(taskInput.validity.valueMissing){
        taskInput.setCustomValidity("I am expecting a task name!");
    } else {
        taskInput.setCustomValidity("");
    if (event.code === "Enter") {
      event.preventDefault();
      const taskName = taskInput.value.trim();
      const taskDue = taskDueDate.value;
      const taskPriority = prioritySelect.value;
      const workspaceOrProject = returnProjectGivenID(newTaskForm);
      workspaceOrProject.addTaskToProject(taskName, taskDue, taskPriority);
      saveTasks();
      appendTodoPane(makeProjectListPane(workspaceOrProject));
    }
}
  });

  newTaskForm.append(taskInput, dueDateContainer);

  return newTaskForm;
};

const makeTaskListMemeber = (task) => {
  const taskContainer = document.createElement("div");
  taskContainer.dataset.taskId = task.id;
  taskContainer.classList.add("task");
  taskContainer.dataset.priority = task.priority;
  taskContainer.addEventListener("click", () => {
    displayTaskContent(task);
  });
  const title = document.createElement("p");
  title.classList.add("task-title");
  title.textContent = task.title;

  const project = document.createElement("span");
  project.classList.add("task-project");
  if (task.project !== "All" && task.project !== "Inbox") {
    project.textContent = task.project;
  }
  const done = document.createElement("input");
  done.type = "checkbox";
  done.classList.add("task-done");
  done.checked = task.done;
  done.addEventListener("click", () => {
    const proj = returnProjectGivenID(taskContainer);
    task.toggleDone();
    if (task.done) {
      taskMasterList.addCompletedTasks(task);
      appendTodoPane(makeProjectListPane(proj));
    } else if (!task.done) {
      taskMasterList.unCompleteTask(task);
      appendTodoPane(makeProjectListPane(proj));
    }
    saveTasks();
  });
  const taskNotes = document.createElement("span");
  taskNotes.id = "task-notes";
  if (task.note) {
    taskNotes.textContent = "󰎛";
  }
  const dueDate = document.createElement("p");
  dueDate.classList.add("task-dueDate");
  if (task.dueDate) {
    dueDate.textContent = formatDistanceToNowStrict(task.dueDate);
  }
  const description = document.createElement("p");
  description.classList.add("task-description");
  description.textContent = task.description;

  const deleteTaskBtn = makeElement("button");
  deleteTaskBtn.id = "delete-task";
  deleteTaskBtn.textContent = "X";
  deleteTaskBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const proj = returnProjectGivenID(taskContainer);
    taskMasterList.deleteSingleTask(task);
    saveTasks();
    clearTaskOverview();
    appendTodoPane(makeProjectListPane(proj));
  });
  taskContainer.append(
    done,
    title,
    dueDate,
    project,
    description,
    taskNotes,
    deleteTaskBtn,
  );

  return taskContainer;
};

function displayTaskContent(task) {
  const taskOverview = document.querySelector(".task-overview");
  taskOverview.textContent = "";
  const titleContainer = makeContainer("task-title");
  const titleLabel = makeElement("span");
  titleLabel.textContent = "Title:";
  titleLabel.classList.add("task-title");
  const title = makeElement("p");
  title.classList.add("task-title", "editable");
  title.textContent = task.title;
  title.contentEditable = "true";
  titleContainer.append(
    titleLabel,
    title,
    acceptChanges(task, "title", title, "textContent"),
    cancelChanges(task, "title", title),
  );

  const descriptionForm = makeElement("form");
  descriptionForm.id = "description-form";
  const descriptionInput = makeElement("input");
  descriptionInput.type = "text";
  descriptionInput.id = "description-input";
  if (task.description) {
    descriptionInput.value = task.description;
  } else {
    descriptionInput.placeholder = "Project Description Max 30 Chars";
  }
  descriptionInput.setAttribute("maxlength", 30);
  const descriptionLabel = makeElement("label");
  descriptionLabel.htmlFor = "description-input";
  descriptionLabel.textContent = "Description:";
  descriptionLabel.classList.add("task-title");
  descriptionLabel.id = "description-label";
  const formDescriptionButtonContainer = makeContainer("form-desc-buttons");
  formDescriptionButtonContainer.append(
    acceptChanges(task, "description", descriptionInput, "value"),
    cancelChanges(task, "description", descriptionInput, "value"),
  );
  const formDescriptionInputContainer = makeContainer("form-desc-input");
  formDescriptionInputContainer.append(descriptionLabel, descriptionInput);
  descriptionForm.append(
    formDescriptionInputContainer,
    formDescriptionButtonContainer,
  );

  const dueDatePriorityForm = makeElement("form");
  dueDatePriorityForm.id = "due-date-priority-form";
  const taskDueDate = document.createElement("input");

  taskDueDate.type = "datetime-local";
  taskDueDate.name = "task-due-date";
  taskDueDate.id = "task-due-date";
  const dueDateContainer = makeContainer("edit-task-duedate-container");
  dueDateContainer.append(
    taskDueDate,
    acceptChanges(task, "dueDate", taskDueDate, "value"),
  );
  const prioritySelect = document.createElement("select");
  prioritySelect.options[prioritySelect.options.length] = new Option(
    "🟥",
    "red-flag",
  );
  prioritySelect.options[prioritySelect.options.length] = new Option(
    "🟨",
    "yellow-flag",
  );
  prioritySelect.options[prioritySelect.options.length] = new Option(
    "🟦",
    "blue-flag",
  );
  prioritySelect.options[prioritySelect.options.length] = new Option(
    "⬜",
    "clear-flag",
  );
  const priorityContainer = makeContainer("edit-task-priority-container");
  priorityContainer.append(
    prioritySelect,
    acceptChanges(task, "priority", prioritySelect, "value"),
  );

  dueDatePriorityForm.append(dueDateContainer, priorityContainer);

  const taskNotes = makeElement("textarea");
  taskNotes.id = "task-note-field";
  if (task.note) {
    taskNotes.value = task.note;
  }
  const taskNotesContainer = makeContainer("task-notes-container");
  const taskNotesButtonContainer = makeContainer("task-note-button-container");
  const notesTitle = makeElement("h2");
  notesTitle.textContent = "Notes";
  taskNotesButtonContainer.append(
    acceptChanges(task, "note", taskNotes, "value"),
    cancelChanges(task, "note", taskNotes, "value"),
  );
  taskNotesContainer.append(notesTitle, taskNotes, taskNotesButtonContainer);
  taskOverview.append(
    titleContainer,
    descriptionForm,
    dueDatePriorityForm,
    taskNotesContainer,
  );
}

function acceptChanges(task, property, element, elementProp) {
  const acceptChange = makeElement("button");
  const projectIndex = ProjectMasterList.findProject(task.projectID);
  const workspaceIndex = WorkspaceMasterList.findWorkspace(task.projectID);
  const workspace = WorkspaceMasterList.getWorkspaces()[workspaceIndex];
  const project = ProjectMasterList.getProjects()[projectIndex];
  acceptChange.textContent = "\u{2713}";
  acceptChange.id = "accept-change";
  acceptChange.type = "button";
  acceptChange.addEventListener("click", () => {
    task[property] = element[elementProp];
    if (project) {
      appendTodoPane(makeProjectListPane(project));
    } else {
      appendTodoPane(makeProjectListPane(workspace));
    }
    saveTasks();
  });

  return acceptChange;
}
function cancelChanges(task, property, element, elementProp) {
  const cancelChange = makeElement("button");
  cancelChange.textContent = "X";
  cancelChange.id = "cancel-change";
  cancelChange.type = "button";
  cancelChange.addEventListener("click", () => {
    element[elementProp] = task[property];
  });

  return cancelChange;
}
export { makeInputBox, makeTaskListMemeber };

import "../css/reset.css";
import "../css/style.css";

import { makeInputBox } from "./todoUI.js";

const todoPane = document.querySelector(".todo-pane");

todoPane.appendChild(makeInputBox());




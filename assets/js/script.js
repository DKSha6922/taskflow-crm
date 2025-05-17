const navBtn = document.getElementById("nav_btn");
const sidebar = document.getElementById("sidebar_section");

const addTaskBtn = document.querySelectorAll(".add_task_btn");
const addTask = document.querySelectorAll(".add_task");

const dropDown = document.querySelectorAll(".dropdown_list");
const dropDownNestedList = document.querySelectorAll(".dropdown_nested");

const createNewProjectBtn = document.getElementById("create_project_button");
const allProjectsList = document.getElementById("all_project_list");

const addTaskListBtn = document.getElementById("add_task_list");
const taskListItems = document.getElementById("task_lists_items");

const deleteTaskBtn = document.querySelectorAll(".dlt_task_btn");
const mainImageSection = document.getElementById("main-img-section");

// delete task btn
deleteTaskBtn.forEach((dltBtn, index) => {
  dltBtn.addEventListener("click", () => {
    dropDown[index].remove();
    dropDownNestedList[index].remove();
  });
});

function dropDownSubList(index) {
  let li = document.createElement("li");
  li.className = "list-item";

  const input = document.createElement("input");
  input.type = "text";
  input.value = "New Item";
  input.readOnly = true;

  let btn = document.createElement("button");
  btn.textContent = "Edit";
  btn.className = "edit-btn";
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  btn.addEventListener("click", () => {
    if (input.readOnly) {
      input.readOnly = false;
      input.focus();
      btn.textContent = "Save";
    } else {
      input.readOnly = true;
      btn.textContent = "Edit";
    }
  });

  li.appendChild(input);
  li.appendChild(btn);
  li.appendChild(deleteBtn);

  function handleDeleteTask() {
    li.remove();
  }

  deleteBtn.addEventListener("click", handleDeleteTask);
  if (index !== undefined && addTask[index]) {
    addTask[index].appendChild(li);
  }

  return li;
}

addTaskBtn.forEach((addBtn, index) => {
  addBtn.addEventListener("click", () => {
    if (addTask[index]) {
      dropDownSubList(index);
    }
  });
});

navBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

// DropDown function on list
function dropDownFunc() {
  dropDown.forEach((drop, dropIndex) => {
    drop.addEventListener("click", () => {
      if (dropDownNestedList[dropIndex]) {
        dropDownNestedList[dropIndex].classList.toggle("show");
      }
    });
  });
}

dropDownFunc();

// Create a New Project for list
function createNewProject(createProject) {
  const li = document.createElement("li");
  li.className = "lists";
  allProjectsList.appendChild(li);

  const div = document.createElement("div");
  div.className = "dropdown_list";
  li.appendChild(div);

  const ul = document.createElement("ul");
  ul.id = "list_nested";
  ul.className = "list_nested dropdown_nested";
  li.appendChild(ul);

  const content = document.createElement("p");
  content.textContent = createProject || "New Project";
  div.appendChild(content);

  const i = document.createElement("i");
  i.id = "nav_list_btn";
  i.className = "fa-solid fa-chevron-down";
  i.ariaHidden = true;
  div.appendChild(i);

  const nestedDiv = document.createElement("div");
  nestedDiv.className = "list_nested_1";
  ul.appendChild(nestedDiv);

  const span = document.createElement("span");
  nestedDiv.appendChild(span);

  const addBtn = document.createElement("button");
  addBtn.className = "btn add_task_btn";
  addBtn.ariaLabel = "Add new project";
  span.appendChild(addBtn);

  const nestedI = document.createElement("i");
  nestedI.className = "fa-solid fa-plus";
  nestedI.ariaHidden = true;
  addBtn.appendChild(nestedI);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn dlt_task_btn";
  deleteBtn.ariaLabel = "Delete a project";
  span.appendChild(deleteBtn);

  const nestedIx = document.createElement("i");
  nestedIx.className = "fa-solid fa-xmark";
  nestedIx.ariaHidden = true;
  deleteBtn.appendChild(nestedIx);

  const addTaskDiv = document.createElement("div");
  addTaskDiv.className = "add_task";
  nestedDiv.appendChild(addTaskDiv);

  div.addEventListener("click", () => {
    ul.classList.toggle("show");
  });

  addBtn.addEventListener("click", () => {
    const taskItem = dropDownSubList();
    addTaskDiv.appendChild(taskItem);
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });
}

createNewProjectBtn.addEventListener("click", () => {
  let createProject = prompt("Enter Your Project Name : ");

  while (!createProject || !isNaN(createProject)) {
    if (createProject === null) {
      return;
    }
    createProject = prompt("Please enter a valid project name (text only):");
  }
  createNewProject(createProject);
});

// main page functianality
function handleAddTaskList() {
  const article = document.createElement("article");
  article.className = "task_list";
  article.ariaLabel = "task1";
  article.draggable = true;

  article.addEventListener("dragstart", handlerDragStart);
  article.addEventListener("dragover", handleDragOver);
  article.addEventListener("drop", handleDrop);
  article.addEventListener("dragend", handleDragEnd);
  article.addEventListener("touchstart", handleTouchStart, { passive: false });
  article.addEventListener("touchmove", handleTouchMove, { passive: false });
  article.addEventListener("touchend", handleTouchEnd);

  const taskNameDiv = document.createElement("div");
  taskNameDiv.className = "task_list_desc";
  article.appendChild(taskNameDiv);

  const taskMemberDiv = document.createElement("div");
  taskMemberDiv.className = "task_list_img";
  article.appendChild(taskMemberDiv);

  const inputRadio = document.createElement("input");
  inputRadio.type = "radio";
  inputRadio.name = "task-select";
  inputRadio.id = "task1";
  taskNameDiv.appendChild(inputRadio);

  let taskDesc = prompt("Enter Your Task: ");
  while (!taskDesc || !isNaN(taskDesc)) {
    if (taskDesc === null) {
      return;
    }
    taskDesc = prompt("Please enter a valid project name :");
  }

  const taskDescription = document.createElement("h3");
  taskDescription.textContent = taskDesc;
  taskDescription.id = "task1";
  taskNameDiv.appendChild(taskDescription);

  const taskStatus = document.createElement("p");
  taskStatus.className = "task_status";
  taskStatus.textContent = "In progress";
  taskMemberDiv.appendChild(taskStatus);

  const taskStatusTime = document.createElement("time");
  taskStatusTime.dateTime = "PT2H54M";
  taskStatusTime.textContent = "02:54";
  taskMemberDiv.appendChild(taskStatusTime);

  const taskStatusImg = document.createElement("img");
  taskStatusImg.className = "img_1";
  taskStatusImg.src = "public/img/avatar.jpg";
  taskStatusImg.alt = "Task assignee avatar";
  taskStatusImg.width = "40";
  taskStatusImg.height = "40";
  taskMemberDiv.appendChild(taskStatusImg);

  const taskMenuBtn = document.createElement("button");
  taskMenuBtn.className = "list_btn";
  taskMenuBtn.ariaLabel = "Task option";
  taskMemberDiv.appendChild(taskMenuBtn);

  const btnIcon = document.createElement("i");
  btnIcon.className = "fa-solid fa-ellipsis";
  btnIcon.ariaHidden = true;
  taskMenuBtn.appendChild(btnIcon);

  const ul = document.createElement("ul");
  ul.className = "user-task-log";
  ul.id = "user-task-log";
  taskMenuBtn.appendChild(ul);

  const openLi = document.createElement("li");
  openLi.className = "user-task-opt";
  ul.appendChild(openLi);
  const openAncor = document.createElement("a");
  openAncor.className = "user-task-link";
  openAncor.textContent = "Open";
  openLi.appendChild(openAncor);

  const linkLi = document.createElement("li");
  linkLi.className = "user-task-opt";
  ul.appendChild(linkLi);
  const linkAncor = document.createElement("a");
  linkAncor.className = "user-task-link";
  linkAncor.textContent = "Get link";
  linkLi.appendChild(linkAncor);

  const cloneLi = document.createElement("li");
  cloneLi.className = "user-task-opt";
  ul.appendChild(cloneLi);
  const cloneAncor = document.createElement("a");
  cloneAncor.className = "user-task-link";
  cloneAncor.textContent = "Clone";
  cloneLi.appendChild(cloneAncor);

  const deleteLi = document.createElement("li");
  deleteLi.className = "user-task-opt";
  ul.appendChild(deleteLi);
  const deleteAncor = document.createElement("a");
  deleteAncor.className = "user-task-link";
  deleteAncor.textContent = "Delete";
  deleteLi.appendChild(deleteAncor);

  taskMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    ul.classList.toggle("task-show");
  });

  document.addEventListener("click", () => {
    ul.classList.remove("task-show");
  });
  taskListItems.appendChild(article);
}

let draggedItem = null;
let initialY = 0;
let currentY = 0;
let touchDraggedItem = null;
function handlerDragStart(e) {
  draggedItem = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
  this.style.opacity = "0.4";
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  if (draggedItem !== this) {
    const targetRect = this.getBoundingClientRect();
    const targetMiddle = targetRect.top + targetRect.height / 2;

    if (e.clientY < targetMiddle) {
      taskListItems.insertBefore(draggedItem, this);
    } else {
      if (this.nextSibling) {
        taskListItems.insertBefore(draggedItem, this.nextSibling);
      } else {
        taskListItems.appendChild(draggedItem);
      }
    }
  }
  return false;
}

function handleDragEnd() {
  this.style.opacity = "1";
}

// Touch-based drag and drop functions
function handleTouchStart(e) {
  e.preventDefault();
  touchDraggedItem = this;
  initialY = e.touches[0].clientY;
  this.classList.add("dragging");
  this.style.transition = "none";
}

function handleTouchMove(e) {
  if (!touchDraggedItem) return;
  e.preventDefault();

  currentY = e.touches[0].clientY;
  const deltaY = currentY - initialY;

  // Move the dragged item
  touchDraggedItem.style.transform = `translateY(${deltaY}px)`;

  // Get all task items except the dragged one
  const items = [
    ...taskListItems.querySelectorAll(".task_list:not(.dragging)"),
  ];

  // Find the item we're hovering over
  const hoveredItem = items.find((item) => {
    const rect = item.getBoundingClientRect();
    return currentY >= rect.top && currentY <= rect.bottom;
  });

  if (hoveredItem) {
    const rect = hoveredItem.getBoundingClientRect();
    const middleY = rect.top + rect.height / 2;

    if (currentY < middleY) {
      hoveredItem.classList.add("drag-over-top");
      hoveredItem.classList.remove("drag-over-bottom");
    } else {
      hoveredItem.classList.add("drag-over-bottom");
      hoveredItem.classList.remove("drag-over-top");
    }
  }
}

function handleTouchEnd() {
  if (!touchDraggedItem) return;

  const items = [...taskListItems.querySelectorAll(".task_list")];
  const hoveredItem =
    items.find((item) => item.classList.contains("drag-over-top")) ||
    items.find((item) => item.classList.contains("drag-over-bottom"));

  if (hoveredItem) {
    const isTop = hoveredItem.classList.contains("drag-over-top");

    if (isTop) {
      taskListItems.insertBefore(touchDraggedItem, hoveredItem);
    } else {
      taskListItems.insertBefore(touchDraggedItem, hoveredItem.nextSibling);
    }
  }
  // Reset styles
  items.forEach((item) => {
    item.classList.remove("drag-over", "drag-over-top", "drag-over-bottom");
    item.style.transform = "";
  });

  touchDraggedItem.classList.remove("dragging");
  touchDraggedItem.style.transform = "";
  touchDraggedItem.style.transition = "";
  touchDraggedItem = null;
}

if (taskListItems) {
  taskListItems.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  taskListItems.addEventListener("drop", function (e) {
    e.preventDefault();
    if (draggedItem) {
      taskListItems.appendChild(draggedItem);
    }
  });
}

addTaskListBtn.addEventListener("click", () => {
  const img = document.createElement("img");
  img.className = "img_1";
  img.src = "public/img/avatar.jpg";
  img.alt = "Team member avatar";
  img.width = "40";
  img.height = "40";
  console.log(mainImageSection.appendChild(img));

  handleAddTaskList();
});

// progress side tab
const timePauseAndPlay = document.getElementById("time-pause-and-play");
const icon = document.getElementById("play-icon");
const taskTrackingTime = document.getElementById("tracking-time");
let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const userInformationBtn = document.getElementById("user-information-btn");

const userLog = document.getElementById("user-log");
const hideTrackingBtn = document.getElementById("hide-tracking-display");

const timeTrackingDisplay = document.getElementById("time-tracking-display");

function formatTime(timeInSeconds) {
  const minutes = String.apply(Math.floor(timeInSeconds / 60)).padStart(2, "0");
  const seconds = String(timeInSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    elapsedTime++;
    taskTrackingTime.textContent = formatTime(elapsedTime);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

timePauseAndPlay.addEventListener("click", () => {
  if (isRunning && icon.classList.contains("fa-pause")) {
    stopTimer();
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");
  } else {
    startTimer();

    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play");
  }
  isRunning = !isRunning;
});

userInformationBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  userLog.classList.toggle("show-task");
});

document.addEventListener("click", () => {
  userLog.classList.remove("show-task");
});

hideTrackingBtn.addEventListener("click", () => {
  if (timeTrackingDisplay.style.display === "none") {
    timeTrackingDisplay.style.display = "block";
  } else {
    timeTrackingDisplay.style.display = "none";
  }
});

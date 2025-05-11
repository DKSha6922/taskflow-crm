const navBtn = document.getElementById("nav_btn");
const sidebar = document.getElementById("sidebar_section");

const addTaskBtn = document.querySelectorAll("#add_task_btn");
const addTask = document.querySelectorAll(".add_task");

const dropDown = document.querySelectorAll(".dropdown_list");
const dropDownNestedList = document.querySelectorAll(".dropdown_nested");

const createNewProjectBtn = document.getElementById("create_project_button");
const allProjectsList = document.getElementById("all_project_list");

// Create project inside the list
function dropDownSubList(btnIndex, task, taskIndex) {
  let li = document.createElement("li");
  li.className = "list-item";

  const input = document.createElement("input");
  input.type = "text";
  input.value = "New Item";
  input.readOnly = true;

  let btn = document.createElement("button");
  btn.textContent = "Edit";

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
  btnIndex == taskIndex ? task.appendChild(li) : null;
}

console.log(allProjectsList);

navBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

// DropDown function on list
function dropDownFunc() {
  dropDown.forEach((drop, dropIndex) => {
    drop.addEventListener("click", () => {
      dropDownNestedList.forEach((dropNest, nestIndex) => {
        dropIndex == nestIndex ? dropNest.classList.toggle("show") : null;
      });
    });
  });
}

dropDownFunc();

addTaskBtn.forEach((btn, btnIndex) => {
  btn.addEventListener("click", () => {
    addTask.forEach((task, taskIndex) => {
      dropDownSubList(btnIndex, task, taskIndex);
    });
  });
});

// Create a New Project for list
function createNewProject() {
  const craeteProject = prompt("Enter Your Project Name :");
  if (!craeteProject) {
    alert("Enter Proper Value !");
  } else {
    const li = document.createElement("li");
    li.className = "lists";
    li.id = "lists";

    const listHead = document.createElement("div");
    listHead.className = "dropdown_list";
    li.appendChild(listHead);

    const listDropDown = document.createElement("ul");
    listDropDown.id = "list_nested";
    listDropDown.className = "list_nested dropdown_nested";
    li.appendChild(listDropDown);

    listHead.addEventListener("click", () => {
      listDropDown.classList.toggle("show");
    });

    const listHeading = document.createElement("p");
    listHeading.textContent = craeteProject;
    listHead.appendChild(listHeading);
    const listHeadingDropDownBtn = document.createElement("i");
    listHeadingDropDownBtn.id = "nav_list_btn";
    listHeadingDropDownBtn.className = "fa-solid fa-chevron-down";
    listHead.appendChild(listHeadingDropDownBtn);

    const listNestedDiv = document.createElement("div");
    listNestedDiv.className = "list_nested_1";
    listDropDown.appendChild(listNestedDiv);

    const createListProjectBtn = document.createElement("span");
    listNestedDiv.appendChild(createListProjectBtn);

    const addTaskDiv = document.createElement("div");
    addTaskDiv.className = "add_task";
    listNestedDiv.appendChild(addTaskDiv);

    const addTaskBtn = document.createElement("button");
    addTaskBtn.id = "add_task_btn";
    addTaskBtn.className = "btn";

    createListProjectBtn.appendChild(addTaskBtn);

    addTaskBtn.addEventListener("click", () => {
      let li = document.createElement("li");
      li.className = "list-item";

      const input = document.createElement("input");
      input.type = "text";
      input.value = "New Item";
      input.readOnly = true;

      let btn = document.createElement("button");
      btn.textContent = "Edit";

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
      addTaskDiv.appendChild(li);
    });

    const addTaskBtnIcon = document.createElement("i");
    addTaskBtnIcon.className = "fa-solid fa-plus";
    addTaskBtnIcon.ariaHidden = true;

    addTaskBtn.appendChild(addTaskBtnIcon);
    allProjectsList.appendChild(li);
    dropDownFunc();
  }
}

createNewProjectBtn.addEventListener("click", () => {
  createNewProject();
});

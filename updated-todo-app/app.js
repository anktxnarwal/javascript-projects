const inputBox = document.getElementById("input-box");
const todoList = document.getElementById("todo-items");

function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText === "") {
    alert("Please add something!");
  } else {
    const li = document.createElement("li");
    li.textContent = taskText;

    const span = document.createElement("span");
    span.innerHTML = "&#128465;";
    li.appendChild(span);

    todoList.appendChild(li);
    saveData();
  }

  inputBox.value = "";
}

todoList.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
    saveData();
  },
  false
);

function saveData() {
  localStorage.setItem("todoData", todoList.innerHTML);
}

function showData() {
  const savedData = localStorage.getItem("todoData");
  if (savedData) {
    todoList.innerHTML = savedData;
  }
}

showData();

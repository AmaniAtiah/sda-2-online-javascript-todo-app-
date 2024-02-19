const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector(".add-todo");
const todoinput = document.querySelector(".new-todo");

// const todoDelete = document.createElement("button");

const todos = [];

function displayTodos(todos) {
  todoList.innerHTML = "";
  if (todos.length === 0) {
    console.log("empty");
    const empty = document.createElement("div");
    empty.classList.add("empty");
    const noTodo = document.createElement("p");
    noTodo.innerHTML = "No todos yet";
    noTodo.appendChild(empty);
    todoList.appendChild(noTodo);
  } else {
    for (let index = 0; index < todos.length; index++) {
      const todoItem = document.createElement("div");
      todoItem.classList.add("item-list");

      const tododesc = document.createElement("p");
      tododesc.textContent = todos[index].description;
      todoItem.appendChild(tododesc);

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");

      const inputCheckbox = document.createElement("input");
      inputCheckbox.classList.add("checkbox-btn");

      inputCheckbox.type = "checkbox";
      inputCheckbox.checked = todos[index].completed;
      buttonContainer.appendChild(inputCheckbox);
      //   todoItem.appendChild(inputCheckbox);

      const todoDelete = document.createElement("button");
      todoDelete.classList.add("delete-btn");

      const icon = document.createElement("i");
      icon.classList.add("fa", "fa-trash");
      todoDelete.appendChild(icon);
      buttonContainer.appendChild(todoDelete);
      todoItem.appendChild(buttonContainer);
      //   todoItem.appendChild(todoDelete);

      todoList.appendChild(todoItem);

      todoDelete.addEventListener("click", function () {
        deleteTodo(index);
      });
    }
  }
}

function addTodo() {
  if (todoinput.value === "") {
    alert("Please enter a todo");
  } else {
    const tododesc = todoinput.value.trim();
    const todo = {
      description: tododesc,
      completed: false,
    };
    todos.push(todo);

    displayTodos(todos);
    todoinput.value = "";
  }
}
function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodos(todos);
}

addButton.addEventListener("click", addTodo);

displayTodos(todos);

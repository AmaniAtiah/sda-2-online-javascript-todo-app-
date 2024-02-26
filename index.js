const btnAddElement = document.querySelector("#btnAdd");
const listElement = document.querySelector(".list");
const descriptionElement = document.getElementById("task");
const countDoingElement = document.querySelector(".count-doing");
const countCompletedElement = document.querySelector(".count-completed");
const addTodoElement = document.querySelector(".add-todo");

let todos = [];

const loadData = () => {
  if (localStorage.getItem("todos") != null) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
};
loadData();

const saveLocalStorge = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

btnAddElement.addEventListener("click", (event) => {
  event.preventDefault();
  if (btnAddElement.textContent === "Create") {
    if (descriptionElement.value != "") {
      const newTodo = {
        description: descriptionElement.value,
        status: "doing",
      };
      todos.push(newTodo);
      addTodoElement.textContent = "";
    } else {
      addTodoElement.textContent = "please add a description";
    }
    displayTodos(todos);
    descriptionElement.value = "";

    saveLocalStorge();
  }
});

const displayTodos = (todos) => {
  listElement.innerHTML = "";
  todos.forEach((todo, index) => {
    const items = document.createElement("li");
    items.classList.add(todo.status);

    items.innerHTML = `
        <div class="complete-icon" onClick = "completeTodo(${index})">
        <svg class="w-6 h-6 text-gray-800 dark:text-white class="complete-icon" onClick = "completeTodo(${index})" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        
      </div>
      <div class="content">
        ${todo.description}
      </div>
      <div class="icon">
        <svg class="w-6 h-6 text-gray-800 dark:text-white icon-close" onClick = "deleteTodo(${index})" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>
        </svg>
        <svg class="w-6 h-6 text-gray-800 dark:text-white edit-icon" onClick = "updateTodo(${index}, this)" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
        </svg>
      </div>
        `;

    listElement.appendChild(items);
  });
  countTodos();
};

function countTodos() {
  let countComplete = 0;
  let countDoing = 0;

  for (const todo of todos) {
    if (todo.status === "doing") {
      countDoing++;
    } else if (todo.status === "complete") {
      countComplete++;
    }
  }
  countDoingElement.textContent = `total number of todo items ${countDoing} (doing)`;

  countCompletedElement.textContent = `total number of todo items ${countComplete} (completed)`;
}

const completeTodo = (index) => {
  todos[index].status = "complete";

  displayTodos(todos);
  saveLocalStorge();
};

const updateTodo = (index, editIcon) => {
  btnAddElement.textContent = "Update";
  descriptionElement.value = todos[index].description;

  if (btnAddElement.textContent === "Update") {
    const iconCloseAndEdit = editIcon.closest(".icon");

    if (iconCloseAndEdit) {
      iconCloseAndEdit.remove();
    }

    if (descriptionElement.value) {
      const updateHandler = () => {
        todos[index].description = descriptionElement.value;
        displayTodos(todos);

        btnAddElement.removeEventListener("click", updateHandler);

        btnAddElement.textContent = "Create";
        descriptionElement.value = "";
        saveLocalStorge();
      };

      btnAddElement.addEventListener("click", updateHandler);
    }
  }
};

const deleteTodo = (index) => {
  todos = todos.filter((task, newIndex) => {
    return newIndex !== index;
  });

  displayTodos(todos);
  saveLocalStorge();
};

const searchIcon = document.querySelector(".search-icon");
const searchInput = document.getElementById("searchInput");

function performSearch(query) {
  const filteredTodos = todos.filter((todo) =>
    todo.description && query
      ? todo.description.toLowerCase().includes(query.toLowerCase())
      : false
  );

  displayTodos(filteredTodos);
}

searchInput.addEventListener("input", function () {
  const query = searchInput.value;
  performSearch(query);
});

displayTodos(todos);

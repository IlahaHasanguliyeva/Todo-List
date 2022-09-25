"use strict";
// form
let todos = JSON.parse(localStorage.getItem("todos")) || [];
const newTodoForm = document.querySelector("#new-todo-form");
// username
const newName = localStorage.getItem("username") || "";

const userName = document.querySelector("#name");
userName.value = newName;

userName.addEventListener("input", (e) => {
  localStorage.setItem("username", e.target.value);
});

displayTodos();

newTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if(e.currentTarget.elements.content.value === "" && e.currentTarget.elements.category.value === "") {
    alert("Input fields is empty!")
  } else if ( e.currentTarget.elements.content.value === "") {
    alert("Input field is empty!")
  }
  else if ( e.currentTarget.elements.category.value === "") {
    alert("Pick a category!")
  } else {

  const todo = {
    content: e.currentTarget.elements.content.value,
    category: e.currentTarget.elements.category.value,
    done: false,
  };

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  e.currentTarget.reset();

  displayTodos();
}
});

function displayTodos() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }

    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly />`;
    edit.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      displayTodos();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
      });
    });

    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    });
  });
}

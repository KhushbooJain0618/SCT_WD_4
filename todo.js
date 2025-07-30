const inputBox = document.getElementById("inputBox");
const addbutton = document.getElementById("addbutton");
const todolist = document.getElementById("todolist");
const dateBox = document.getElementById("dateBox");
const timeBox = document.getElementById("timeBox");

let edittodo = null;

const addtodo = () => {
    const inputText = inputBox.value.trim();
    const dateText = dateBox.value;
    const timeText = timeBox.value;

    if (inputText.length <= 0) {
        alert("You must write something in your to-do");
        return false;
    }

    const dueText = `${dateText} ${timeText}`.trim();

    if (addbutton.value === "Edit") {
        editLocaltodos(edittodo.target.previousElementSibling.innerText);
        edittodo.target.previousElementSibling.innerText = inputText;

        // Optional: update due date/time in UI too
        const meta = edittodo.target.parentElement.querySelector(".task-meta");
        if (meta) {
            meta.innerText = dueText;
        }

        addbutton.value = "Add";
        inputBox.value = "";
        dateBox.value = "";
        timeBox.value = "";
    } else {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        if (dueText) {
            const small = document.createElement("div");
            small.classList.add("task-meta");
            small.innerText = `Due: ${dueText}`;
            li.appendChild(small);
        }

        const editbutton = document.createElement("button");
        editbutton.innerText = "Edit";
        editbutton.classList.add("button", "editbutton");
        li.appendChild(editbutton);

        const deletebutton = document.createElement("button");
        deletebutton.innerText = "Remove";
        deletebutton.classList.add("button", "deletebutton");
        li.appendChild(deletebutton);

        todolist.appendChild(li);

        saveLocaltodos({ text: inputText, due: dueText });

        inputBox.value = "";
        dateBox.value = "";
        timeBox.value = "";
    }
};

// Function to update : (Edit/Delete) todo
const updatetodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todolist.removeChild(e.target.parentElement);
        deleteLocaltodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addbutton.value = "Edit";
        edittodo = e;
    }
}

const saveLocaltodos = (todoObj) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todos));
};


const getLocaltodos = () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo.text;
        li.appendChild(p);

        if (todo.due) {
            const small = document.createElement("div");
            small.classList.add("task-meta");
            small.innerText = `Due: ${todo.due}`;
            li.appendChild(small);
        }

        const editbutton = document.createElement("button");
        editbutton.innerText = "Edit";
        editbutton.classList.add("button", "editbutton");
        li.appendChild(editbutton);

        const deletebutton = document.createElement("button");
        deletebutton.innerText = "Remove";
        deletebutton.classList.add("button", "deletebutton");
        li.appendChild(deletebutton);

        todolist.appendChild(li);
    });
};


const deleteLocaltodos = (todoElement) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let todoText = todoElement.querySelector("p").innerText;
    todos = todos.filter(todo => todo.text !== todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
};


const editLocaltodos = (oldText) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const index = todos.findIndex(todo => todo.text === oldText);
    if (index > -1) {
        todos[index].text = inputBox.value;
        todos[index].due = `${dateBox.value} ${timeBox.value}`.trim();
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};


document.addEventListener("DOMContentLoaded", getLocaltodos);
addbutton.addEventListener("click", addtodo);
todolist.addEventListener("click", updatetodo);
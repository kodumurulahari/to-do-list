document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = `task ${task.completed ? "completed" : ""}`;

            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskItem.appendChild(taskText);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit";
            editButton.addEventListener("click", () => editTask(index));
            taskItem.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete";
            deleteButton.addEventListener("click", () => deleteTask(index));
            taskItem.appendChild(deleteButton);

            const completeButton = document.createElement("button");
            completeButton.textContent = task.completed ? "Uncomplete" : "Complete";
            completeButton.className = "complete";
            completeButton.addEventListener("click", () => toggleCompleteTask(index));
            taskItem.appendChild(completeButton);

            taskList.appendChild(taskItem);
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    };

    const editTask = (index) => {
        const newTaskText = prompt("Edit your task:", tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText;
            saveTasks();
            renderTasks();
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const toggleCompleteTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    renderTasks();
});

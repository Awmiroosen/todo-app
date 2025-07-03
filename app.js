    const taskList = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskTitle = document.getElementById("taskTitle");
    const taskDescription = document.getElementById("taskDescription");

    const editTaskForm = document.getElementById("editTaskForm");
    const editTitle = document.getElementById("editTitle");
    const editDescription = document.getElementById("editDescription");
    const saveEditBtn = document.getElementById("saveEditBtn");
    const cancelEditBtn = document.getElementById("cancelEditBtn");

    const overlay = document.getElementById("overlay");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let editingIndex = null;

    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("bg-gray-800", "p-4", "rounded-lg", "mb-4", "shadow-lg", "relative", "border-4", "transition-all", "duration-300");
        
        if (task.completed) taskItem.classList.add("border-green-500");
        else taskItem.classList.add("border-gray-600");

        taskItem.innerHTML = `
          <div class="flex flex-col space-y-2">
            <h3 class="font-bold text-white">${task.title}</h3>
            <p class="text-sm text-gray-400">${task.description}</p>
            <p class="text-sm ${task.completed ? 'text-green-500' : 'text-yellow-400'}">${task.completed ? "بایان رسیده" : "در حال انجام"}</p>
          </div>
          <div class="absolute top-4 right-4 space-x-2">
            <button class="markCompleteBtn bg-green-500 hover:bg-green-400 text-white p-2 rounded-md">
              <span class="material-icons">check_circle</span>
            </button>
            <button class="editBtn bg-yellow-500 hover:bg-yellow-400 text-white p-2 rounded-md">
              <span class="material-icons">edit</span>
            </button>
            <button class="deleteBtn bg-red-500 hover:bg-red-400 text-white p-2 rounded-md">
              <span class="material-icons">delete</span>
            </button>
          </div>
        `;
        taskList.appendChild(taskItem);

        const markCompleteBtn = taskItem.querySelector(".markCompleteBtn");
        markCompleteBtn.addEventListener("click", () => markComplete(index));

        const editBtn = taskItem.querySelector(".editBtn");
        editBtn.addEventListener("click", () => startEditing(index));

        const deleteBtn = taskItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => deleteTask(index));
      });
    };

    const addTask = () => {
      if (!taskTitle.value || !taskDescription.value) return;
      const newTask = {
        title: taskTitle.value,
        description: taskDescription.value,
        completed: false,
      };
      tasks.unshift(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskTitle.value = '';
      taskDescription.value = '';
      renderTasks();
    };

    const deleteTask = (index) => {
      const taskItem = taskList.children[index];
      taskItem.classList.add("border-red-500");
      taskItem.classList.add("opacity-0");
      setTimeout(() => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      }, 1000);
    };

    const startEditing = (index) => {
      editingIndex = index;
      const task = tasks[index];
      editTitle.value = task.title;
      editDescription.value = task.description;
      editTaskForm.classList.remove("hidden");
      overlay.classList.remove("hidden");
    };

    const saveEdit = () => {
  if (editingIndex !== null) {
    if (!editTitle.value || !editDescription.value) {
      alert("لطفاً عنوان و توضیحات را وارد کنید.");
      return;
    }

    tasks[editingIndex].title = editTitle.value;
    tasks[editingIndex].description = editDescription.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    closeEditForm();
  }
};


    const closeEditForm = () => {
      editTaskForm.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    const markComplete = (index) => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    addTaskBtn.addEventListener("click", addTask);
    saveEditBtn.addEventListener("click", saveEdit);
    cancelEditBtn.addEventListener("click", closeEditForm);

    renderTasks();
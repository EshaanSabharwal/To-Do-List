const addTaskForm = document.getElementById("add-task-form");
const taskInput = document.getElementById("task-input");
const pendingTasks = document.getElementById("pending-tasks");
const completedTasks = document.getElementById("completed-tasks");

let tasks = [];

addTaskForm.addEventListener("submit", function(e) {
	e.preventDefault();
	const task = {
		name: taskInput.value,
		id: Date.now(),
		completed: false
	};
	tasks.push(task);
	renderTasks();
	taskInput.value = "";
});

function renderTasks() {
	pendingTasks.innerHTML = "";
	completedTasks.innerHTML = "";
	tasks.forEach(function(task) {
		const li = document.createElement("li");
		const span = document.createElement("span");
		span.textContent = task.name;
		const button = document.createElement("button");
		button.textContent = task.completed ? "Incomplete" : "Complete";
		button.addEventListener("click", function() {
			task.completed = !task.completed;
			renderTasks();
		});
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", function() {
			tasks = tasks.filter(function(t) {
				return t.id !== task.id;
			});
			renderTasks();
		});
		li.appendChild(span);
		li.appendChild(button);
		li.appendChild(deleteButton);
		if (task.completed) {
			li.classList.add("completed");
			completedTasks.appendChild(li);
		} else {
			pendingTasks.appendChild(li);
		}
	});
}

renderTasks();
 // Event listener to load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a new task
function addTask(event) {
  if (event.key === 'Enter') {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const emoji = document.getElementById('emoji');
   
    if (taskInput.value.trim() !== '') {
      // Get the trimmed task text
      const taskText = taskInput.value.trim();

      // Create a new list item
      const listItem = document.createElement('li');
      listItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Remove</button>`;
     
      // Append the list item to the task list
      taskList.appendChild(listItem);
     
      // Save tasks to local storage
      saveTasks();
      // Clear the input field
      taskInput.value = '';

      // Hide emoji when adding a new task using animation
      emoji.style.animation = 'none';
      void emoji.offsetWidth; // Trigger reflow
      emoji.style.animation = 'emojiAnimation .5s ease-out';
    }
  }
}

// Function to remove a task
function removeTask(button) {
  const taskList = document.getElementById('taskList');
  const listItem = button.parentElement;
  taskList.removeChild(listItem);
  // Save tasks to local storage
  saveTasks();
 
  // Show emoji when removing a task using animation
  document.getElementById('emoji').style.animation = 'emojiAnimation .5s ease-out';
}

// Function to save tasks to local storage
function saveTasks() {
  const taskList = document.getElementById('taskList');
  // Extract task text from list items
  const tasks = Array.from(taskList.children).map(li => li.textContent.replace('Remove', '').trim());
  // Save tasks as a JSON string in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage on page load
function loadTasks() {
  const taskList = document.getElementById('taskList');
  // Get saved tasks from local storage or use an empty array
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const emoji = document.getElementById('emoji');
 
  // Iterate over saved tasks and create list items
  savedTasks.forEach(taskText => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Remove</button>`;
    taskList.appendChild(listItem);
  });

  // Show emoji if there are no tasks
  if (savedTasks.length === 0) {
    emoji.style.animation = 'emojiAnimation .5s ease-out';
  }
}
 
const apiUrl = 'http://localhost:3000/tasks';

const taskForm = document.getElementById('taskForm');
const taskIdField = document.getElementById('taskId');
const titleField = document.getElementById('title');
const descriptionField = document.getElementById('description');
const taskTable = document.getElementById('taskTable');

async function fetchTasks() {
  try {
    const res = await fetch(apiUrl);
    const tasks = await res.json();
    taskTable.innerHTML = '';
    tasks.forEach(task => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description || ''}</td>
        <td>
          <button class="edit-btn" 
            data-id="${task.id}" 
            data-title="${encodeURIComponent(task.title)}" 
            data-description="${encodeURIComponent(task.description || '')}">
            Edit
          </button>
          <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </td>
      `;
      taskTable.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    alert('Failed to fetch tasks. Please try again.');
  }
}

taskForm.onsubmit = async (e) => {
  e.preventDefault();
  const id = taskIdField.value;
  const title = titleField.value.trim();
  const description = descriptionField.value.trim();

  if (!title) {
    alert('Title is required');
    return;
  }

  try {
    const task = { title, description };
    if (id) {
      await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    } else {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    }

    taskForm.reset();
    taskIdField.value = '';
    await fetchTasks();
  } catch (error) {
    console.error('Error saving task:', error);
    alert('Failed to save task. Please try again.');
  }
};

taskTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const id = e.target.dataset.id;
    const title = decodeURIComponent(e.target.dataset.title);
    const description = decodeURIComponent(e.target.dataset.description);
    editTask(id, title, description);
  }
});

function editTask(id, title, description) {
  taskIdField.value = id;
  titleField.value = title;
  descriptionField.value = description;
  titleField.focus();
}

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  try {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    await fetchTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Failed to delete task. Please try again.');
  }
}

fetchTasks(); 
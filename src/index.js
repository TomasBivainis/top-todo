import './styles.css';
import { getId, deleteTask, changeProject, newTask, newProject, deleteProject, getProjectTitle, getTasks, updateTask, updateProjectTitle, getProjects } from './module.js';

const divTasks = document.querySelector("#tasks");
const inputProjectTitle = document.querySelector('#project_name');
const buttonNewTask = document.querySelector('#new_task');
const divProjects = document.querySelector("#projects");
const btnNewProject = document.querySelector('#new_project');

function displayTasks() {
  divTasks.innerHTML = "";
  let tasks = getTasks();

  for(let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    const divNewTask = document.createElement('div');
    divNewTask.classList.add(`${i}`);
    divNewTask.classList.add('task');

    const divInputs = document.createElement('div');
    divInputs.classList.add('inputs');
    
    const inputTitle = document.createElement('input');
    inputTitle.value = task.title;
    inputTitle.type = 'text';
    inputTitle.classList.add(`${i}`);
    inputTitle.classList.add('title');
    inputTitle.placeholder = 'Title';
    
    inputTitle.addEventListener('input', e => {
      let id = getId(e);
      let tasks = getTasks();
      tasks[id].title = e.target.value;
      updateTask(task, id);
    })

    const textareaDescription = document.createElement('textarea');
    textareaDescription.value = task.description;
    textareaDescription.classList.add(`${i}`);
    textareaDescription.placeholder = 'description';

    textareaDescription.addEventListener('input', e => {
      let id = getId(e);
      let tasks = getTasks();
      tasks[id].description = e.target.value;
      updateTask(task, id);
    })

    const inputDueDate = document.createElement('input');
    inputDueDate.value = task.dueDate;
    inputDueDate.classList.add(`${i}`);
    inputDueDate.type = 'date';

    inputDueDate.addEventListener('input', e => {
      let id = getId(e);
      let tasks = getTasks();
      tasks[id].dueDate = e.target.value;
      updateTask(task, id);
    })

    const inputPriority = document.createElement('input');
    inputPriority.value = task.priority;
    inputPriority.classList.add(`${i}`);
    inputPriority.type = 'number';
    inputPriority.placeholder = 'Priority';

    inputPriority.addEventListener('input', e => {
      let id = getId(e);
      let tasks = getTasks();
      tasks[id].dueDate = e.target.value;
      updateTask(task, id);
    })

    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = "X";
    btnDelete.classList.add(`${i}`);
    btnDelete.classList.add('delete');

    btnDelete.addEventListener('click', e => {
      let id = getId(e);
      deleteTask(id);
      updateDisplay();
    });

    divInputs.appendChild(inputTitle);
    divInputs.appendChild(inputDueDate);
    divInputs.appendChild(inputPriority);
    divInputs.appendChild(textareaDescription);
    divNewTask.appendChild(divInputs);
    divNewTask.appendChild(btnDelete);

    divTasks.appendChild(divNewTask);
  }
}

function displayProjects() {
  divProjects.innerHTML = "";
  let projects = getProjects();

  for(let i = 0; i < projects.length; i++) {
    let btnNewProject = document.createElement('button');
    btnNewProject.innerHTML = projects[i].title;
    btnNewProject.classList.add(`${i}`);
    btnNewProject.classList.add('project');

    btnNewProject.addEventListener('click', e => {
      changeProject(getId(e));
      updateDisplay();
    })

    divProjects.appendChild(btnNewProject);
  }
}

function updateDisplay() {
  inputProjectTitle.value = getProjectTitle();
  displayTasks();
  displayProjects();
}
 
function changeProjectTitle() {
  updateProjectTitle(inputProjectTitle.value);
  updateDisplay();
}

btnNewProject.addEventListener('click', () => {
  newProject();
  updateDisplay();
});

inputProjectTitle.addEventListener('input', () => {
  changeProjectTitle();
  updateDisplay();
});

buttonNewTask.addEventListener('click', () => {
  newTask();
  updateDisplay();
});

updateDisplay();
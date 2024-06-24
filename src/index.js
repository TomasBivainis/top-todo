import './styles.css';
import { createTask, createProject } from "./module";
const divTasks = document.querySelector("#tasks");
const inputProjectTitle = document.querySelector('#project_name');
const buttonNewTask = document.querySelector('#new_task');

let projects = [];

projects.push(createProject());

let selectedProject = 0;

function displayTasks() {
  divTasks.innerHTML = "";

  projects[selectedProject].tasks.forEach(task => {
    const divNewTask = document.createElement('div');
    divNewTask.classList.add('task');

    const title = document.createElement('input');
    title.value = task.title;
    title.type = 'text';

    const description = document.createElement('textarea');
    description.value = task.description;

    const dueDate = document.createElement('input');
    dueDate.value = task.dueDate;
    dueDate.type = 'date';

    const priority = document.createElement('input');
    priority.value = task.priority;
    priority.type = 'number';

    divNewTask.appendChild(title);
    divNewTask.appendChild(dueDate);
    divNewTask.appendChild(priority);
    divNewTask.appendChild(description);

    divTasks.appendChild(divNewTask);
  });
}

function displayProject() {
  inputProjectTitle.value = projects[selectedProject].title;
  displayTasks();
}

function changeProject(newSelectedProject) {
  selectedProject = newSelectedProject;
  displayProject();
}

function changeProjectTitle() {
  projects[selectedProject].title = inputProjectTitle.value;
}

function newTask() {
  projects[selectedProject].tasks.push(createTask());
  displayTasks();
}

inputProjectTitle.addEventListener('input', changeProjectTitle);
buttonNewTask.addEventListener('click', newTask);

displayProject();


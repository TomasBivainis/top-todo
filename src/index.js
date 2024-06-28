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

  function deleteTask(taskNumber) {
    projects[selectedProject].tasks.splice(taskNumber, 1);
    displayTasks();
  }

  for(let i = 0; i < projects[selectedProject].tasks.length; i++) {
    let task = projects[selectedProject].tasks[i];

    const divNewTask = document.createElement('div');
    divNewTask.classList.add('task');
    divNewTask.id = `${i}`;

    const inputTitle = document.createElement('input');
    inputTitle.value = task.title;
    inputTitle.type = 'text';
    inputTitle.classList.add('title');
    inputTitle.id = `${i}`;

    inputTitle.addEventListener('input', e => {
      let id = parseInt(e.target.id);
      projects[selectedProject].tasks[id].title = e.target.value;
    })

    const textareaDescription = document.createElement('textarea');
    textareaDescription.value = task.description;
    textareaDescription.id = `${i}`;

    textareaDescription.addEventListener('input', e => {
      let id = parseInt(e.target.id);
      projects[selectedProject].tasks[id].description = e.target.value;
    })

    const inputDueDate = document.createElement('input');
    inputDueDate.value = task.dueDate;
    inputDueDate.type = 'date';
    inputDueDate.id = `${i}`;

    inputDueDate.addEventListener('input', e => {
      let id = parseInt(e.target.id);
      projects[selectedProject].tasks[id].dueDate = e.target.value;
    })

    const inputPriority = document.createElement('input');
    inputPriority.value = task.priority;
    inputPriority.type = 'number';
    inputPriority.id = `${i}`;

    inputPriority.addEventListener('input', e => {
      let id = parseInt(e.target.id);
      projects[selectedProject].tasks[id].priority = parseInt(e.target.value);
    })

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('delete');
    btnDelete.innerHTML = "Delete";
    btnDelete.classList.add('delete');
    btnDelete.id = `${i}`;

    btnDelete.addEventListener('click', e => {
      let id = parseInt(e.target.id);
      deleteTask(id);
    });

    divNewTask.appendChild(inputTitle);
    divNewTask.appendChild(inputDueDate);
    divNewTask.appendChild(inputPriority);
    divNewTask.appendChild(textareaDescription);
    divNewTask.appendChild(btnDelete);

    divTasks.appendChild(divNewTask);
  }
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


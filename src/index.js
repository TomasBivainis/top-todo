import './styles.css';
import { createTask, createProject } from "./module";
const divTasks = document.querySelector("#tasks");
const inputProjectTitle = document.querySelector('#project_name');
const buttonNewTask = document.querySelector('#new_task');
const divProjects = document.querySelector("#projects");
const btnNewProject = document.querySelector('#new_project');

let projects = [];

projects.push(createProject(projects.length));

let selectedProject = 0;

function getId(e) { 
  return parseInt(e.target.classList[0]);
}

function displayTasks() {
  divTasks.innerHTML = "";

  function deleteTask(taskNumber) {
    projects[selectedProject].tasks.splice(taskNumber, 1);
    displayTasks();
  }

  for(let i = 0; i < projects[selectedProject].tasks.length; i++) {
    let task = projects[selectedProject].tasks[i];

    const divNewTask = document.createElement('div');
    divNewTask.classList.add(`${i}`);
    divNewTask.classList.add('task');
    

    const inputTitle = document.createElement('input');
    inputTitle.value = task.title;
    inputTitle.type = 'text';
    inputTitle.classList.add(`${i}`);
    inputTitle.classList.add('title');
    

    inputTitle.addEventListener('input', e => {
      let id = getId(e);
      projects[selectedProject].tasks[id].title = e.target.value;
    })

    const textareaDescription = document.createElement('textarea');
    textareaDescription.value = task.description;
    textareaDescription.classList.add(`${i}`);

    textareaDescription.addEventListener('input', e => {
      let id = getId(e);
      projects[selectedProject].tasks[id].description = e.target.value;
    })

    const inputDueDate = document.createElement('input');
    inputDueDate.value = task.dueDate;
    inputDueDate.classList.add(`${i}`);
    inputDueDate.type = 'date';

    inputDueDate.addEventListener('input', e => {
      let id = getId(e);
      projects[selectedProject].tasks[id].dueDate = e.target.value;
    })

    const inputPriority = document.createElement('input');
    inputPriority.value = task.priority;
    inputPriority.classList.add(`${i}`);
    inputPriority.type = 'number';
    

    inputPriority.addEventListener('input', e => {
      let id = getId(e);
      projects[selectedProject].tasks[id].priority = parseInt(e.target.value);
    })

    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = "Delete";
    btnDelete.classList.add(`${i}`);
    btnDelete.classList.add('delete');

    btnDelete.addEventListener('click', e => {
      let id = getId(e);
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
  displayProjects();
}

function displayProjects() {
  divProjects.innerHTML = "";

  for(let i = 0; i < projects.length; i++) {
    let btnNewProject = document.createElement('button');
    btnNewProject.innerHTML = projects[i].title;
    btnNewProject.classList.add(`${i}`);

    btnNewProject.addEventListener('click', e => {
      changeProject(getId(e));
    })

    divProjects.appendChild(btnNewProject);
  }
}
 
function changeProject(newSelectedProject) {
  selectedProject = newSelectedProject;
  displayProject();
}

function changeProjectTitle() {
  projects[selectedProject].title = inputProjectTitle.value;
  divProjects.childNodes[selectedProject].innerHTML = inputProjectTitle.value;
}

function newTask() {
  projects[selectedProject].tasks.push(createTask(projects[selectedProject].tasks.length));
  displayTasks();
}

function newProject() {
  projects.push(createProject(projects.length));
  selectedProject = projects.length - 1;
  displayProjects();
  displayProject();
}

function deleteProject() {
  projects.splice(selectedProject, 1);
  selectedProject--;
}

btnNewProject.addEventListener('click', newProject);
inputProjectTitle.addEventListener('input', changeProjectTitle);
buttonNewTask.addEventListener('click', newTask);

displayProject();


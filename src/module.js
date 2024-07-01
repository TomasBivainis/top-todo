function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function createTask() {
  return {
    "title": '',
    "description": "",
    "dueDate": getCurrentDate(),
    "priority": 1,
  }
}

function createProject(number) {
  return {
    "title": `Untitled ${number}`,
    "tasks": [],
  }
}

function getCurrentDate() {
  let date = new Date();

  let year = `${date.getFullYear()}`;
  let month = `${date.getMonth()}`;
  let day = `${date.getDate()}`;

  if(month.length == 1) month = `0${month}`;
  if(day.length == 1) day = `0${day}`;

  return `${year}-${month}-${day}`;
}

let projects = [];
let selectedProject = 0;

if(storageAvailable("localStorage") && localStorage.saved !== undefined) {
  projects = JSON.parse(localStorage.saved);
}
else {
  projects.push(createProject(projects.length));
}

function save() {
  if(storageAvailable("localStorage")) {
    localStorage.saved = JSON.stringify(projects);
  }
}

function getId(e) { 
  return parseInt(e.target.classList[0]);
}

function deleteTask(taskNumber) {
  projects[selectedProject].tasks.splice(taskNumber, 1);
  save();
}

function changeProject(newSelectedProject) {
  selectedProject = newSelectedProject;
}

function newTask() {
  projects[selectedProject].tasks.push(createTask());
  save();
}

function newProject() {
  projects.push(createProject(projects.length));
  selectedProject = projects.length - 1;
  save();
}

function deleteProject() {
  projects.splice(selectedProject, 1);
  selectedProject = Math.max(0, selectedProject - 1);
  save();
}

function getTasks() {
  return projects[selectedProject].tasks;
}

function getProjectTitle() {
  return projects[selectedProject].title;
}

function getProjects() {
  return projects;
}

function updateTask(task, id) {
  projects[selectedProject].task[id] = task;
  save();
}

function updateProjectTitle(title) {
  projects[selectedProject].title = title;
  save();
}

export default {
  getId,
  deleteTask,
  changeProject,
  newTask,
  newProject,
  deleteProject,
  getTasks,
  getProjectTitle,
  updateTask,
  updateProjectTitle,
  getProjects,
}


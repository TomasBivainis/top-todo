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

projects.push(createProject(projects.length));

function getId(e) { 
  return parseInt(e.target.classList[0]);
}

function deleteTask(taskNumber) {
  projects[selectedProject].tasks.splice(taskNumber, 1);
}

function changeProject(newSelectedProject) {
  selectedProject = newSelectedProject;
}

function newTask() {
  projects[selectedProject].tasks.push(createTask());
}

function newProject() {
  projects.push(createProject(projects.length));
  selectedProject = projects.length - 1;
}

function deleteProject() {
  projects.splice(selectedProject, 1);
  selectedProject--;
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
}

function updateProjectTitle(title) {
  projects[selectedProject].title = title;
}

module.exports = {
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


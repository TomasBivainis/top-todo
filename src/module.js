function createTask() {
  return {
    "title": "Untitled",
    "description": "",
    "dueDate": getCurrentDate(),
    "priority": 1,
  }
}

function createProject() {
  return {
    "title": "Untitled",
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

module.exports = {
  createTask,
  createProject,
}
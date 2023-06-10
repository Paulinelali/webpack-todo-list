import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.css';
import Interface from './modules/interface.js';

// Display list on page load
document.addEventListener('DOMContentLoaded', Interface.displayToDoList);
// Event: Add a task
document
  .querySelector('#title')
  .addEventListener('keypress', (e) => Interface.addTask(e));
// Event: clear all tasks completed
document
  .querySelector('.clearTask')
  .addEventListener('click', (e) => Interface.clearAllTasks(e));
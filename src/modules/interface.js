import ToDo from './todo.js';
import Storage from './storage.js';

export default class Interface {
  static toDoList = Storage.getTasks();

  static completedTasks = [];

  static editList = '';

  static displayToDoList = () => {
    const toDoListContainer = document.querySelector(
      '.toDoItem',
    );
    const clearBtn = document.querySelector('.clearTask');
    if (Interface.toDoList.length === 0) {
      clearBtn.classList.add('hide');
      toDoListContainer.innerHTML = '';
      toDoListContainer.innerHTML = 'Add A Task At Least!';
      toDoListContainer.classList.add('errorMsg');
    } else {
      toDoListContainer.innerHTML = '';
      clearBtn.classList.remove('hide');
      // sort the ToDo array by index
      Interface.toDoList.sort((a, b) => a.index - b.index);
      Interface.toDoList.forEach((task) => {
        const taskIndex = task.index;
        const taskDescription = task.description;
        const listItem = document.createElement('div');
        listItem.className = 'toDoList';
        listItem.innerHTML = `
  <input type="checkbox" class="checkbox" id="${taskIndex}" name="${taskDescription}" value="${taskDescription}"><i id="${taskIndex}" class="fa fa-check hide tick" aria-hidden="true"></i><div class='taskDescription'>${taskDescription}</div>
  <input type="text" class="editInput hide" id="${taskIndex}" name="${taskDescription}" value="${taskDescription}">
  <button type="button" class="optionBtn" ><i class="fa fa-ellipsis-v fa-2xl menu" id="${taskIndex}" aria-hidden="true"></i></button>
  <button type="button" class="deleteBtn hide" ><i class="fa fa-trash fa-xl trash-bin" aria-hidden="true"></i></button>
  `;
        toDoListContainer.appendChild(listItem);
      });
      // add event listener to each ellipses
      const optionBtn = document.querySelectorAll('.optionBtn');
      optionBtn.forEach((btn) => {
        btn.addEventListener('click', (event) => {
          const listItem = event.target.closest('.toDoList');
          if (Interface.editList === '') {
            Interface.editList = listItem;
            Interface.editTask(Interface.editList);
          } else if (Interface.editList) {
            if (Interface.editList !== listItem) {
              Interface.cancelEditTask(Interface.editList);
              Interface.editList = listItem;
              Interface.editTask(Interface.editList);
            } else if (Interface.editList === listItem) {
              Interface.cancelEditTask(listItem);
              Interface.editTask(Interface.editList);
            }
          }
        });
      });

      // add event listener to each checkbox
      const checkboxes = document.querySelectorAll('.checkbox');
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
          Interface.lineOnTask(event.target);
          const task = Interface.toDoList.find(
            (task) => task.index === parseInt(event.target.id, 10),
          );
          task.done = event.target.checked;
          Storage.updateTasks(Interface.toDoList);
        });
      });
    }
  };

  // add task to list
  static addTask = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const title = document.querySelector('#title').value;
      if (title === '') {
        Interface.showAlert('Please fill emepty fields!', 'danger');
      } else {
        const index = Interface.toDoList.length;
        const task = new ToDo(title, false, index + 1);
        Storage.setTasks(task);
        Interface.toDoList = Storage.getTasks();
        Interface.completedTasks = [];
        Interface.displayToDoList();
        Interface.emptyFields();
      }
    }
  };

  /// clear fields
  static emptyFields = () => {
    document.querySelector('#title').value = '';
  };

  // reorder list
  static arrangeList = () => {
    const newTasks = Interface.toDoList;
    let currentIndex = 1;
    newTasks.forEach((task) => {
      task.index = currentIndex;
      currentIndex += 1;
    });
    Storage.updateTasks(newTasks);
  };

    // clear all completed tasks
    static clearAllTasks = (e) => {
      e.preventDefault();
      if (Interface.completedTasks.length === 0) {
        Interface.showAlert('No task selected!', 'danger');
      } else {
        const i = 0;
        while (i < Interface.completedTasks.length) {
          const completedTask = Interface.completedTasks[i];
          Storage.clearTasks(completedTask);
          Interface.toDoList = Storage.getTasks();
          Interface.completedTasks.splice(i, 1); // Remove the completed task from the array
        }
        Interface.arrangeList();
        Interface.displayToDoList();
      }
    };

  // strike through list if checked
  static lineOnTask = (checkbox) => {
    const checkBoxId = parseInt(checkbox.id, 10);
    const checkBoxValue = checkbox.value;
    const listItem = checkbox.parentNode;
    const taskDescription = listItem.querySelector('.taskDescription');

    if (taskDescription) {
      if (checkbox.checked) {
        const completedTask = {
          description: checkBoxValue,
          completed: true,
          index: checkBoxId,
        };
        Interface.completedTasks.push(completedTask);
        taskDescription.classList.add('completed');
        checkbox.dataset.completedTask = JSON.stringify(completedTask);
      }
    }
  };

  // edit task
  static editTask = (listItem) => {
    const editInput = listItem.querySelector('.editInput');
    const taskDescription = listItem.querySelector('.taskDescription');
    const menInterfacecon = listItem.querySelector('.menu');
    const trashBin = listItem.querySelector('.deleteBtn');
    const taskID = parseInt(menInterfacecon.id, 10);

    if (listItem) {
      const task = Interface.toDoList.findIndex((t) => t.index === taskID);
      if (task !== -1) {
        // Check if task exists
        listItem.classList.add('editColor');
        editInput.classList.remove('hide');
        trashBin.classList.remove('hide');
        menInterfacecon.classList.add('hide');
        taskDescription.classList.add('hide');
        editInput.addEventListener('keypress', (e) => Interface.updateTask(e, taskID, editInput));
        trashBin.addEventListener('click', (e) => {
          Interface.deleteTask(e, taskID);
        });
        Interface.editList = listItem;
      }
    }
  };

  // edit task
  static cancelEditTask = (listItem) => {
    const editInput = listItem.querySelector('.editInput');
    const checkbox = listItem.querySelector('.checkbox');
    const taskDescription = listItem.querySelector('.taskDescription');
    const menInterfacecon = listItem.querySelector('.menu');
    const trashBin = listItem.querySelector('.deleteBtn');

    // remove all previously added classes
    listItem.classList.remove('editColor');
    editInput.classList.add('hide');
    trashBin.classList.add('hide');
    checkbox.classList.remove('hide');
    menInterfacecon.classList.remove('hide');
    taskDescription.classList.remove('hide');
    editInput.removeEventListener('keypress', Interface.updateTask);
    Interface.editList = '';
  };

  // enable delete if fields are empty
  static updateTask(e, taskID, editInput) {
    const inputValue = editInput.value;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue !== '') {
        const taskIndex = Interface.toDoList.findIndex(
          (task) => task.index === taskID,
        );
        if (taskIndex !== -1) {
          Interface.toDoList[taskIndex].description = inputValue;
          Storage.updateTasks(Interface.toDoList);
          Interface.toDoList = Storage.getTasks();
          Interface.displayToDoList();
        }
      }
    }
  }

  // enable delete if fields are empty
  static deleteTask(e, taskID) {
    e.preventDefault();
    Storage.removeTask(e, taskID);
    Interface.toDoList = Storage.getTasks();
    Interface.arrangeList();
    Interface.displayToDoList();
    Interface.editList = '';
  }

  // show alert
  static showAlert = (message, className) => {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${className}`;
    alertBox.appendChild(document.createTextNode(message));
    const listContainer = document.querySelector('.toDoContainer');
    listContainer.insertAdjacentElement('afterend', alertBox);
    setTimeout(() => alertBox.remove(), 1000);
  };
}
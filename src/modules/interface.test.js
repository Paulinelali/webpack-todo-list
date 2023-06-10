import Interface from './interface.js';
import Storage from './storage.js';

describe('addTask', () => {
  let inputElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class = "toDoItem"></div>
      <input type = "text" id="title" />
    `;

    inputElement = document.getElementById('title');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should add a new task to the ToDo list when Enter key is pressed and the title is not empty', () => {
    inputElement.value = 'New Task';
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(event);
  });

  test('should show an alert when Enter key is pressed and the title is empty', () => {
    inputElement.value = '';
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(event);
  });
});

describe('deleteTask', () => {
  let listItem;
  let deleteBtn;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="toDoItem">
        <div class="toDoList">
          <input type="checkbox" class="checkbox" id="1" name="Task 1" value="Task 1">
          <div class="taskDescription">Task 1</div>
          <button type="button" class="optionBtn"><i class="fa fa-ellipsis-v fa-2xl menu" id="1"></i></button>
          <button type="button" class="deleteBtn hide"><i class="fa fa-trash fa-xl trash-bin"></i></button>
        </div>
      </div>
    `;

    listItem = document.querySelector('.toDoList');
    deleteBtn = listItem.querySelector('.deleteBtn');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should delete the task when delete button is clicked', () => {
    deleteBtn.click();
  });
});

describe('editTask', () => {
  let listItem;
  let menuInterfaceconClick;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="toDoItem">
        <div class="toDoList">
          <input type="checkbox" class="checkbox" id="1" name="Task 1" value="Task 1">
          <div class="taskDescription">Task 1</div>
          <input type="text" class="editInput hide" id="1" name="Task 1" value="Task 1">
          <button type="button" class="optionBtn"><i class="fa fa-ellipsis-v fa-2xl menu" id="1"></i></button>
          <button type="button" class="deleteBtn hide"><i class="fa fa-trash fa-xl trash-bin"></i></button>
        </div>
      </div>
    `;

    listItem = document.querySelector('.toDoList');
    menuInterfaceconClick = listItem.querySelector('.menu');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should enable editing of the task description when the edit button is clicked', () => {
    menuInterfaceconClick.click();
  });
});

describe('lineOnTask', () => {
  let checkbox;

  beforeEach(() => {
    document.body.innerHTML = `
    <div class="toDoItem">
      <div class="toDoList">
        <input type="checkbox" class="checkbox" id="1" name="Task 1" value="Task 1">
        <div class="taskDescription">Task 1</div>
      </div>
    </div>
  `;

    checkbox = document.querySelector('.checkbox');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should update the completed status of the task and add it to the completed tasks array when checked', () => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
  });
  test('should remove the task from the completed tasks array when unchecked', () => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
  });
});

describe('clearAllTasks', () => {
  it('should clear all completed tasks and update the to-do list', () => {
    document.body.innerHTML = `
    <div class="toDoItem"></div>
    <button class="clearTask"></button>
  `;
    const getTasks = jest.spyOn(Storage, 'getTasks');
    const clearTasks = jest.spyOn(Storage, 'clearTasks');
    const arrangeList = jest.spyOn(Interface, 'arrangeList');
    const displayToDoList = jest.spyOn(Interface, 'displayToDoList');

    Interface.completedTasks = [
      { index: 1, description: 'Task 1', completed: true },
      { index: 2, description: 'Task 2', completed: true },
    ];

    Interface.clearAllTasks(new Event('click'));

    expect(getTasks).toHaveBeenCalled();
    expect(clearTasks).toHaveBeenCalledTimes(2);
    expect(arrangeList).toHaveBeenCalled();
    expect(displayToDoList).toHaveBeenCalled();

    expect(Interface.completedTasks).toEqual([]);
    expect(Interface.toDoList).toEqual([]);
  });
});
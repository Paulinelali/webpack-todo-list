export default class Storage {
  static getTasks = () => {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  };

  static updateTasks = (task) => {
    localStorage.setItem('tasks', JSON.stringify(task));
  };

  static setTasks = (task) => {
    const tasks = Storage.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  static removeTask = (e, taskID) => {
    e.preventDefault();
    let tasks = Storage.getTasks();
    tasks = tasks.filter((task) => task.index !== taskID);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static clearTasks = (done) => {
    const tasks = Storage.getTasks();
    const newTaskList = tasks.map((task) => {
      if (task.index === done.index) {
        return done;
      }
      return task;
    });
    const newTask = newTaskList.filter((task) => task.done === false);
    Storage.updateTasks(newTask);
  };
}
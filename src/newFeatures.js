const taskField = document.querySelector('.input-field');
const form = document.querySelector('.todo-form');
const ul = document.querySelector('.ul');

let arr = [];
let taskIndex = 0;

// append clear all complete
const clearTodo = () => {
  const li = document.createElement('li');
  li.classList.add('todo');
  li.classList.add('clear-all-complete');
  li.innerHTML = `
              <div>
              <button class="clear-all-complete-btn">Clear All Complete</button>
              </div>
          `;

  ul.appendChild(li);
};

const edit = () => {
  const todoText = document.querySelectorAll('.todo-text');
  const newArr = [];
  todoText.forEach((el) => {
    el.addEventListener('focusout', () => {
      let fromLocal = localStorage.getItem('task');
      fromLocal = JSON.parse(fromLocal);
      const elId = el.id;
      const newTask = document.getElementById(elId).innerHTML;
      let fieldCounter = `${el.className.split(' ')[1]}`;
      fieldCounter *= 1;
      for (let i = 0; i < fromLocal.length; i += 1) {
        if (fromLocal[i] === fromLocal[fieldCounter]) {
          fromLocal[i].task = newTask;
        }

        newArr.push(fromLocal[i]);
      }

      localStorage.setItem('task', JSON.stringify(newArr));
    });
  });
};

const ediTable = () => {
  const startEdit = document.querySelectorAll('.dot');
  const editable = document.querySelectorAll('.todo-text');
  const trashCan = document.querySelectorAll('.trash-can');

  const hoveFnc = (el) => {
    el.classList.toggle('hover-danger');
  };
  // hide dot and show trash can and also enable and focus edit
  startEdit.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.target.classList.toggle('init-hide');
      const trashCanId = `trash-can-${e.target.className.split(' ')[1]}`;
      const ediTableFieldId = `editable-${e.target.className.split(' ')[1]}`;
      const ediTableField = document.getElementById(ediTableFieldId);
      ediTableField.contentEditable = true;
      ediTableField.focus();

      const trashCan = document.getElementById(trashCanId);
      hoveFnc(trashCan);
      trashCan.classList.toggle('init-hide');
      editable.contentEditable = true;

      edit();
    });
  });

  // delete by clicking on trash can and also update DOM and localStorage
  trashCan.forEach((el) => {
    el.addEventListener('click', (e) => {
      let fromLocal = localStorage.getItem('task');
      fromLocal = JSON.parse(fromLocal);
      const counter = `${e.target.className.split(' ')[3]}`;
      const newArr = [];
      for (let i = 0; i < fromLocal.length; i += 1) {
        if (fromLocal[i] !== fromLocal[counter]) {
          newArr.push(fromLocal[i]);
        }
      }

      localStorage.setItem('task', JSON.stringify(newArr));
      // below is same as calling stockDom()
      const stockDomCopy = () => {
        ul.innerHTML = '';
        let counter = 0;
        let fromLocal = localStorage.getItem('task');
        if (fromLocal) {
          fromLocal = JSON.parse(fromLocal);
          fromLocal.forEach((el) => {
            const li = document.createElement('li');
            li.classList.add('todo');
            li.id = `${counter}`;
            li.innerHTML = `
                              <div class="right">
                                  <input type="checkbox" class="checker"> 
                                  <span class="todo-text" id="editable-${counter}">
                                      ${el.task}
                                  </span>
                              </div>
                              <div class="dot-wrapper">
                                  <span class="dot ${counter}" id="dot-${counter}">&#8942;</span>
                              </div>
                              <i class="fas fa-trash init-hide trash-can ${counter}" id="trash-can-${counter}"></i>
                          `;
            ul.appendChild(li);
            counter += 1;
          });
        }
        ediTable();

        clearTodo();
      };

      stockDomCopy();
      // above is same as calling stockDom()
    });
  });
};

// stock DOM
const stockDom = () => {
  ul.innerHTML = '';
  let counter = 0;
  let fromLocal = localStorage.getItem('task');
  if (fromLocal) {
    fromLocal = JSON.parse(fromLocal);
    fromLocal.forEach((el) => {
      const li = document.createElement('li');
      li.classList.add('todo');
      li.id = `${counter}`;
      li.innerHTML = `
                    <div class="right">
                        <input type="checkbox" class="checker"> 
                        <span class="todo-text ${counter}" id="editable-${counter}">
                            ${el.task}
                        </span>
                    </div>
                    <div class="dot-wrapper">
                        <span class="dot ${counter}" id="dot-${counter}">&#8942;</span>
                    </div>
                    <i class="fas fa-trash init-hide trash-can ${counter}" id="trash-can-${counter}"></i>
                `;
      ul.appendChild(li);
      counter += 1;
    });
  }
  ediTable();

  clearTodo();
};

// create and store task in local storage
const createTask = () => {
  // get local storage
  const local = localStorage.getItem('task');
  if (local) {
    const fromLocal = JSON.parse(local);
    taskIndex = fromLocal.length;

    fromLocal.forEach((el) => {
      arr.push(el);
    });
  }

  const objectRep = {
    task: taskField.value,
    complete: false,
    index: taskIndex,
  };

  arr.push(objectRep);

  localStorage.setItem('task', JSON.stringify(arr));
  arr = [];
  form.reset();
};

function formFnc(e) {
  e.preventDefault();
  createTask();
  stockDom();
}
form.addEventListener('submit', formFnc);

export default stockDom;
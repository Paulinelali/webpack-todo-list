import './styles/main.scss';

const ul = document.querySelector('.todo-wrapper');

const toDoOne = {
  description: 'First task',
  complete: false,
  index: 1,
};
const toDoTwo = {
  description: 'Second task',
  complete: false,
  index: 2,
};
const toDoThree = {
  description: 'Third task',
  complete: false,
  index: 3,
};
const toDoFour = {
  description: 'Fourth task',
  complete: false,
  index: 4,
};

const todoArr = [toDoOne, toDoTwo, toDoThree, toDoFour];

const stockDom = () => {
  todoArr.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('todo');
    li.innerHTML = `
            <div class="right">
                <input type="checkbox" class="checker"> 
                <span class="text">
                    ${el.description}
                </span>
            </div>
            <div class="dot-wrapper">
                <span class="dot">&#8942;</span>
            </div>
        `;

    ul.appendChild(li);
  });
};
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

window.onload = () => {
  stockDom();
  clearTodo();
};
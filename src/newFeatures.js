

const taskField = document.querySelector(".input-field");
const form = document.querySelector(".todo-form");
const ul = document.querySelector('.ul');

let arr = [];
let arrFromLocal = [];
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

  const ediTable = () => {
    let startEdit = document.querySelectorAll(".dot");
    let editable = document.querySelectorAll(".todo-text");
    let trashCan = document.querySelectorAll(".trash-can");

    const hoveFnc = (el) => {
                el.classList.toggle("hover-danger")
        }
    // hide dot and show trash can and also enable and focus edit
    startEdit.forEach( el => {
         el.addEventListener("click", (e) => {

            e.target.classList.toggle("init-hide");
            let trashCanId = `trash-can-${e.target.className.split(' ')[1]}`;
            let ediTableFieldId = `editable-${e.target.className.split(' ')[1]}`
            let ediTableField = document.getElementById(ediTableFieldId)
            ediTableField.contentEditable = true;
            ediTableField.focus();
           
            let trashCan = document.getElementById(trashCanId);
             hoveFnc(trashCan)
            trashCan.classList.toggle("init-hide");
            editable.contentEditable = true
    })
    })
   
   
    // delete by clicking on trash can and also update DOM and localStorage
    trashCan.forEach( el => {
         el.addEventListener("click", (e) => {
            let fromLocal = localStorage.getItem("task");
            fromLocal = JSON.parse(fromLocal);
            let counter = `${e.target.className.split(' ')[3]}`
            let newArr = [];
            for( let i=0; i<fromLocal.length; i+=1){
                if(fromLocal[i] !== fromLocal[counter]){
                    newArr.push(fromLocal[i]);
                    console.log(fromLocal[i])
                }
            }
            
            localStorage.setItem("task", JSON.stringify(newArr));
            stockDom();
            
    })
    })
  }

// stock DOM
const stockDom = () => {
    ul.innerHTML = '';
    let counter = 0;
    let fromLocal = localStorage.getItem("task");
    if(fromLocal){
        fromLocal = JSON.parse(fromLocal);
        fromLocal.forEach( el => {
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
        })
    }
    ediTable();

    clearTodo()
}
// create and store task in local storage
const createTask = () => {
   
    // get local storage
    const local = localStorage.getItem("task");
    if(local){
        const fromLocal = JSON.parse(local);
        taskIndex = fromLocal.length;

        fromLocal.forEach( el => {
            arr.push(el);
        })
    }

    const objectRep = {
        task: taskField.value,
        complete: false,
        index: taskIndex,
    }

    arr.push(objectRep);

    localStorage.setItem("task", JSON.stringify(arr));
    arr = [];
    form.reset();
    
}

  function name(e) {
    e.preventDefault()
    createTask()
    stockDom()
  }
form.addEventListener("submit", name);


export {stockDom}
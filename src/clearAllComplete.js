import stockDom from './newFeatures.js';

const clearAllFnc = () => {
  const btn = document.querySelector('.clear-all-complete-btn');

  const clearAll = () => {
    let localArr = localStorage.getItem('task');
    const complete = document.querySelectorAll('.complete');
    localArr = JSON.parse(localArr);
    const arr = []; const
      Arr = [];
    complete.forEach((el) => {
      arr.push((el.id * 1));
    });

    localArr.forEach((el) => {
      Arr.push((el.index * 1));
    });

    const newArr = Arr.filter((el) => !arr.includes(el));

    const arrIntoLocal = [];
    for (let i = 0; i < localArr.length; i += 1) {
      if (newArr[i] in Arr) {
        arrIntoLocal.push(localArr[newArr[i]]);
      }
    }

    localStorage.setItem('task', JSON.stringify(arrIntoLocal));
    stockDom();
  };

  btn.addEventListener('click', clearAll);
};

export default clearAllFnc;
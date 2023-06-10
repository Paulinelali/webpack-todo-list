const checker = () => {
  const checkBoxes = document.querySelectorAll('.checker');
  checkBoxes.forEach((el) => {
    el.addEventListener('change', () => {
      const counter = el.id;
      const parentClass = `li-${counter}`;
      const parentEl = document.querySelectorAll('.todo');

      // mark todo to be removed
      if (el.checked === true) {
        parentEl.forEach((el) => {
          if (el.classList.contains(parentClass)) {
            el.classList.add('line-through');
            el.classList.add('complete');
          }
        });
      }
      if (el.checked === false) {
        parentEl.forEach((el) => {
          if (el.classList.contains(parentClass)) {
            el.classList.remove('line-through');
            el.classList.remove('complete');
          }
        });
      }
    });
  });
};

export default checker;
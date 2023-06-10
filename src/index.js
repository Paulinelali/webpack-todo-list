import './styles/main.scss';
import stockDom from './newFeatures.js';
import checker from './interactive.js';
import clearAllCompleteFnc from './clearAllComplete.js';

window.onload = () => {
  stockDom();
  checker();
  clearAllCompleteFnc();
};
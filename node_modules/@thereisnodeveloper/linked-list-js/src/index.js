// #region required-template
import './reset.css';
import './style.css';
import { linkedList } from './linkedlist.js';

// eslint-disable-next-line no-unused-vars
const testElement = document.createElement('div');
// #endregion



// example uses class syntax - adjust as necessary
const list = linkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

const result = list.toString()
console.log('result:', result)

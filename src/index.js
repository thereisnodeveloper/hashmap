// #region required-template
import './reset.css';
import './style.css';
import murmur from 'murmurhash-js';

// eslint-disable-next-line no-unused-vars
const testElement = document.createElement('div');
// #endregion

function checkIndex(index, buckets) {
  if (index < 0 || index >= buckets.length) {
    throw new Error('Trying to access index out of bound');
  }
}

class HashMap {
  constructor(size) {
    this.size = size;
    this.bucketsArray = new Array(size);
    console.log('this.bucketsArray:', this.bucketsArray);
  }

  set(key, value) {
    // find key using hash code
    // check key against existingKey
      // if same, overwrite old value
  }
}

const hashMap1 = new HashMap(16);

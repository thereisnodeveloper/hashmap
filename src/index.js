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
  constructor() {
    this.defaultSize = 16;
    this.bucketsArray = new Array(this.defaultSize);
    console.log('this.bucketsArray:', this.bucketsArray);
  }

  set(key, value) {
   const hashCode =  murmur(key)
   console.log('hashCode:', hashCode)
   const bucket = hashCode % this.bucketsArray.length
   console.log('bucket:', bucket)

   
   // find bucket using hash code
    // traverse linkedList until you find key
    // check key against existingKey
    // check fn_growBucketIfNeeded
    // if same, overwrite old value with $value
    // if different key (still same bucket), create new node in linkedList
  }
f
  get(key) {
    // TODO: get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
  }
  // TODO: has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

  // TODO: remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.

  // TODO: length() returns the number of stored keys in the hash map.

  // TODO: clear() removes all entries in the hash map.

  // TODO: keys() returns an array containing all the keys inside the hash map.

  // TODO: values() returns an array containing all the values.

  // TODO: entries() returns an array that contains each key, value pair.
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  
}

const hashMap1 = new HashMap();

const result = murmur("blah")


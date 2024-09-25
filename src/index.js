// #region required-template
// import {linkedList} from '@thereisnodeveloper/linked-list';
// importing from file instead of package, for autocomplete
import { linkedList } from './linkedlist.js';

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
    this.bucketsArray = new Array(this.defaultSize).fill(null);

    this.initiateBuckets();
    this.loadFactorThreshold = 0.75;
  }

  initiateBuckets() {
    this.bucketsArray = this.bucketsArray.map((bucket, index) => linkedList(index));
  }

  printBuckets() {
    this.bucketsArray.forEach((bucket) => {
      const printResult = bucket.toString();
      console.log('printResult:', printResult);
    });
  }

  getLoadFactor() {
    // TODO: checks how many buckets are 'empty'
    // reduce probably
  const loadFactor = this.bucketsArray.reduce((previous, current) => previous + current.size, 0) / this.bucketsArray.length
  console.log('loadFactor:', loadFactor)
  }

  growBucketIfNeeded() {
    // check current loadfactor
    // TODO: doubles bucket size if we reach loadFactorThreshold
  }

  set(key, value) {
    const hashCode = murmur(key);
    console.log('hashCode:', hashCode);
    const bucketCode = hashCode % this.bucketsArray.length;

    // find bucket using hash code
    console.log('bucketIndex:', bucketCode);
    console.log('this.bucketsArray[bucketCode].size:', this.bucketsArray[bucketCode].size);
    const targetBucket = this.bucketsArray[bucketCode];
    if (targetBucket.size === 0) {
      targetBucket.append({ key, value });
      return targetBucket;
    }
    // traverse linkedList until you find key
    // check key against existingKey
    const indexOfResult = targetBucket.find({ key, value });
    if (indexOfResult) {
      targetBucket.removeAt(indexOfResult);
      targetBucket.insertAt({ key, value });
      // [0,1,2,3,4]
      // [0,1,3,4]
    }

    // check fn_growBucketIfNeeded

    // if key is same, overwrite old value with $value
    // if different key (still same bucket), create new node in linkedList
  }

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
// const result = hashMap1.set('testKey', 1);
// console.log('result:', result);
hashMap1.printBuckets();

hashMap1.getLoadFactor()
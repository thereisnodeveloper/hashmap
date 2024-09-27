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
    this.hashFunction = this.customHashFunction;
  }

  initiateBuckets() {
    this.bucketsArray = this.bucketsArray.map((bucket, index) => linkedList(index));
  }

  printBuckets() {
    this.bucketsArray.forEach((bucket) => {
      // console.log('bucket:', bucket);
      const printResult = bucket.toString();
      // console.log('printResult:', printResult);
    });
  }

  get loadFactor() {
    // checks how many buckets are 'empty'
    // reduce probably
    const loadFactor =
      this.bucketsArray.reduce((previous, current) => previous + current.size, 0) /
      this.bucketsArray.length;
    console.log('loadFactor:', loadFactor);
    return loadFactor;
  }

  growBucketIfNeeded() {
    // check current loadfactor
    // TODO: doubles bucket size if we reach loadFactorThreshold
  }

  set(key, value) {
    const hashCode = this.hashFunction(key);
    const bucketCode = hashCode % this.bucketsArray.length;
    const targetBucket = this.bucketsArray[bucketCode];

    if (targetBucket.size === 0) {
      targetBucket.append({ key, value });
      return targetBucket;
    }

    const indexOfResult = targetBucket.find({ key, value });
    if (indexOfResult) {
      console.log('%c same key found', 'color: blue');
      console.log(`%c index: ${indexOfResult}`, 'color: blue');
      targetBucket.removeAt(indexOfResult);
      targetBucket.insertAt({ key, value }, indexOfResult);
    } else {
      targetBucket.append({ key, value });
    }

    // TODO: check fn_growBucketIfNeeded

    // if different key (still same bucket), create new node in linkedList
    return targetBucket;
  }

  get(key) {
    const hashCode = this.hashFunction(key);
    const bucketCode = hashCode % this.bucketsArray.length;
    const targetBucket = this.bucketsArray[bucketCode];
    console.log('targetBucket:', targetBucket);
    if (targetBucket.size === 0) return null;
    const resultValue = targetBucket.at(targetBucket.find({ key })).value.value;
    console.log('result:', resultValue);
    return resultValue;
  }

  // TODO: has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.


  // TODO: remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.

  // TODO: length() returns the number of stored keys in the hash map.

  // TODO: clear() removes all entries in the hash map.

  // TODO: keys() returns an array containing all the keys inside the hash map.

  // TODO: values() returns an array containing all the values.

  // TODO: entries() returns an array that contains each key, value pair.
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]

  /** @param {String} key  */
  customHashFunction(key) {
    let charCodeSum = 0;
    // Use golden ratio
    const fractionConstant = 0.618_033;
    for (let index = 0; index < key.length; index++) {
      charCodeSum += key.charCodeAt(index);
    }
    const hashCode = Math.floor(((charCodeSum * fractionConstant) % 1) * this.bucketsArray.length);
    return hashCode;
  }
}

const hashMap1 = new HashMap();

// console.log('hashMap1.bucketsArray[0].size:', hashMap1.bucketsArray[0].size)
const result1 = hashMap1.set('test-key', 0);
// console.log('hashMap1.bucketsArray[0].size:', hashMap1.bucketsArray[0].size)
const result2 = hashMap1.set('key-test', 1);
// console.log('hashMap1.bucketsArray[0].size:', hashMap1.bucketsArray[0].size)
const result3 = hashMap1.set('key-test', 2);
// console.log('hashMap1.bucketsArray[0].size:', hashMap1.bucketsArray[0].size)

hashMap1.printBuckets();
console.log('hashMap1.loadFactor:', hashMap1.loadFactor);
console.log('hashMap1.bucketsArray[0].toString():', hashMap1.bucketsArray[0].toString());

const get = hashMap1.get('key-test');
console.log('get:', get)
// [0,1,] size 2
// removeAt(1)
// [0]
// insertAt(1)

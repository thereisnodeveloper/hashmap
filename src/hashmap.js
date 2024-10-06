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

export default class HashMap {
  constructor(defaultSize = 16) {
    this.defaultSize = defaultSize
    this.currentSize = defaultSize;
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
      console.log('printResult:', printResult);
    });
  }

  get loadFactor() {
    // checks how many buckets are 'empty'
    // reduce probably
    const loadFactor =
      this.bucketsArray.reduce((previous, current) => previous + (current.size > 0 ? 1 : 0),0) /
      this.bucketsArray.length;
    // FIXME: loadFactor is wrong`
    console.log('this.bucketsArray:', this.bucketsArray)

    console.log('this.bucketsArray.length:', this.bucketsArray.length);

    console.log('loadFactor:', loadFactor);
    return loadFactor;
  }

  // TODO: doubles bucket size if we reach loadFactorThreshold
  growBucketIfNeeded() {
    // check current loadfactor\
    console.log('loadFactor:', this.loadFactor);
    if (this.loadFactor >= this.loadFactorThreshold) {
      this.grow();
    }
  }

  grow() {
    this.bucketsArray = [...this.bucketsArray, ...new Array(this.defaultSize).fill(null)];
    this.initiateBuckets();
    this.currentSize *= 2;
    console.log('this.bucketsArray:', this.bucketsArray);
  }

  /**
   * Sets a key-value pair in the hash table.
   * @example
   * set('myKey', 'myValue')
   * { key: 'myKey', value: 'myValue' }
   * @param {string} key - The key associated with the value.
   * @param {*} value - The value to be stored.
   * @returns {Object} The bucket where the key-value pair is stored.
   * @description
   *   - Handles collisions by checking for existing keys in the bucket.
   *   - Replaces the value if the key already exists.
   */
  set(key, value) {
    const hashCode = this.hashFunction(key);
    const bucketCode = hashCode % this.bucketsArray.length;
    console.log('bucketCode:', bucketCode)
    const targetBucket = this.bucketsArray[bucketCode];

    if (targetBucket.size === 0) {
      targetBucket.append({ key, value });
      return targetBucket;
    }

    const indexOfResult = targetBucket.find({ key, value });
    // if (indexOfResult) {
    if (indexOfResult || indexOfResult === 0) {
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
    // console.log('result:', resultValue);

    return resultValue;
  }

  has(key) {
    if (this.get(key) === null || this.get(key) === undefined) return false;
    return true;
  }

  remove(key) {
    const hashCode = this.hashFunction(key);
    const bucketCode = hashCode % this.bucketsArray.length;
    const targetBucket = this.bucketsArray[bucketCode];
    if (targetBucket.size === 0) return null;

    const indexOfResult = targetBucket.find({ key });
    if (indexOfResult || indexOfResult === 0) {
      console.log(`%c key found at ${indexOfResult}`, 'color: green');
      console.log('size before remove:', targetBucket.size);
      targetBucket.removeAt(indexOfResult);
      return true;
    }
    return false;
  }

  length() {
    /**
     * Accumulates the sizes of elements in an array.
     * @example
     * (prev, curr) => {
     *   return prev + curr.size;
     * }
     * @param {number} prev - The accumulated size from previous elements.
     * @param {Object} curr - The current object in the array.
     * @returns {number} The new accumulated size after adding the current object's size.
     * @description
     *   - Assumes 'curr' has a property 'size' that is a number.
     */
    const sumOfBucketSizes = this.bucketsArray.reduce(
      (previous, current) => previous + current.size,
      0
    );
    return sumOfBucketSizes;
  }

  clear() {
    this.initiateBuckets();
  }

  // keys() returns an array containing all the keys inside the hash map.
  keys() {
    return this.entries().map((entry) => entry[0]);
  }

  // values() returns an array containing all the values.
  values() {
    // ??? i'm not sure if it is the best idea to use array to represent key-value pairs as in this case. because it's inflexible, and hard to know , even though i don't think there will be a third or fourth property.
    // also, not a fan of the fact that I'm having to statically configure flat() depth
    return this.entries().map((entry) => entry[1]);
  }

  // entries() returns an array that contains each key, value pair.
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {
    const finalArray = [];
    this.bucketsArray.forEach((bucket) => {
      const bucketKeyValuesArray = bucket.showStorageArray();
      if (bucketKeyValuesArray) finalArray.push(bucket.showStorageArray());
    });
    return finalArray.flat(1);
  }

  /** @param {String} key  */
  customHashFunction(key) {
    let charCodeSum = 0;
    // Use golden ratio
    const fractionConstant = 0.618033;
    for (let index = 0; index < key.length; index++) {
      charCodeSum += key.charCodeAt(index);
    }
    const hashCode = Math.floor(((charCodeSum * fractionConstant) % 1) * this.bucketsArray.length);
    return hashCode;
  }
}

const hashMap1 = new HashMap();

// console.log('hashMap1.bucketsArray[0].size:',  hashMap1.bucketsArray[0].size)
const result1 = hashMap1.set('test-key', 0);
// console.log('hashMap1.bucketsArray[0].size:', hashMap1.bucketsArray[0].size)
const result2 = hashMap1.set('key-test', 1);
// console.log('hashMap1.bucketsArray[0].size:', hashMap1.bucketsArray[0].size)
const result3 = hashMap1.set('key-test', 2);
// console.log('hashMap1.bucketsArray[0].size:', hashMap1.bucketsArray[0].size)
hashMap1.set('ewqewq', 3);
hashMap1.set('ffffffff', 4);
hashMap1.set('fffffff', 5);
hashMap1.set('abcd', 6);
hashMap1.set('acbd', 7);

hashMap1.printBuckets();
console.log('hashMap1.loadFactor:', hashMap1.loadFactor);

// hashMap1.clear();
hashMap1.printBuckets();
// console.log('length:', hashMap1.length());

// console.log(hashMap1.entries());
// console.log(hashMap1.keys());
// console.log(hashMap1.values());

hashMap1.grow();

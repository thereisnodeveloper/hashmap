// #region required-template
// import {linkedList} from '@thereisnodeveloper/linked-list';
// importing from file instead of package, for autocomplete
import { linkedList } from './linkedlist.js';
import murmur from 'murmurhash-js';

import './reset.css';
import './style.css';

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
    this.defaultSize = defaultSize;
    this.currentSize = defaultSize;
    this.bucketsArray = new Array(this.defaultSize).fill(null);
    this.initiateBuckets();
    this.loadFactorThreshold = 0.75;
    this.hashFunction = this.customHashFunction;
  }

  initiateBuckets() {
    // figure out which indices need mapping
    // this.bucketsArray.filter(bucket=>bucket.size > 0)

    this.bucketsArray = this.bucketsArray.map((bucket, index) => linkedList(index));
  }

  printBuckets() {
    this.bucketsArray.forEach((bucket) => {
      // 
      const printResult = bucket.toString();
      
    });
  }

  get loadFactor() {
    // reduce probably
    // const nonEmptyBuckets = this.bucketsArray.reduce(
    //   (cumulator, current) => cumulator + (current.size > 0 ? 1 : 0),
    //   0
    // );

    const numItems = this.bucketsArray.reduce((cumulator, current) => cumulator + current.size, 0);

    // 
    const loadFactor = numItems / this.bucketsArray.length;
    // 

    // 

    // 
    return loadFactor;
  }

  growBucketIfNeeded() {
    // check current loadfactor\
    if (this.loadFactor > this.loadFactorThreshold) {
      
      this.grow();
    }
  }

  grow() {
    //take every stored value and run it through hash function again
    const entries = this.entries();

    this.bucketsArray = new Array(this.currentSize * 2).fill(null);
    this.bucketsArray = this.bucketsArray.map((bucket, index) => {
      return linkedList(index);
    });
    this.currentSize *= 2;  

    this.rehash(entries);

    

    this.printBuckets();
  }
  rehash(entries) {
    
    entries.forEach((entry) => this.set(...entry));
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
    this.growBucketIfNeeded();

    const hashCode = this.hashFunction(key);
    const bucketCode = hashCode % this.bucketsArray.length;
    // 
    const targetBucket = this.bucketsArray[bucketCode];

    if (targetBucket.size === 0) {
      targetBucket.append({ key, value });
      return targetBucket;
    }

    const indexOfResult = targetBucket.find({ key, value });
    if (indexOfResult || indexOfResult === 0) {
      
      
      targetBucket.removeAt(indexOfResult);
      targetBucket.insertAt({ key, value }, indexOfResult);
    } else {
      targetBucket.append({ key, value });
    }


    // if different key (still same bucket), create new node in linkedList

    return targetBucket;
  }

  get(key) {
    const hashCode = this.hashFunction(key);
    const bucketCode = hashCode % this.bucketsArray.length;
    const targetBucket = this.bucketsArray[bucketCode];
    
    if (targetBucket.size === 0) return null;
    const resultValue = targetBucket.at(targetBucket.find({ key })).value.value;
    // 

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
      
      
      targetBucket.removeAt(indexOfResult);
      return true;
    }
    return false;
  }

  length() {
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
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
}

const hashMap1 = new HashMap();

// 
const result1 = hashMap1.set('test-key', 0);
// 
const result2 = hashMap1.set('key-test', 1);
// 
const result3 = hashMap1.set('key-test', 2);
// 
hashMap1.set('ewqewq', 3);
hashMap1.set('ffffffff', 4);

hashMap1.set('fffffff', 5);
hashMap1.set('abcd', 6);
// 

hashMap1.set('acbd', 7);

// 
hashMap1.set('acfbd', 7);

// 
hashMap1.set('acrtbd', 7);

// 
hashMap1.set('acrtbytd', 7);

// 
hashMap1.set('ac5rtbytd', 7);
hashMap1.set('acrtazbytd', 7);
hashMap1.set('ac4rtbytd', 7);
hashMap1.set('acrgbbytd', 7);
hashMap1.set('acrtbfytd', 7);
hashMap1.set('acrtbtytdz', 7);
hashMap1.set('acrtubytd', 7);

hashMap1.set('acrtbyytdf', 7);
hashMap1.set('acrtbyytda', 7);
hashMap1.set('acrtbyytdb', 7);
hashMap1.set('acrtbyytdc', 7);
hashMap1.set('acrtbyytdd', 7);
hashMap1.set('acrtbyytde', 7);
// 


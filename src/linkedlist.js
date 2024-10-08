
// eslint-disable-next-line no-unused-vars

// use Factory functions instead of clsasses

/**
 * @typedef {Object} LinkedList
 * @property {Node|null} tail - The last node in the list
 * @property {Node|null} head - The first node in the list
 * @property {number} size - The number of nodes in the list
 * @property {function(*): Node} append - Adds a new node to the end of the list
 * @property {function(*): Node} prepend - Adds a new node to the beginning of the list
 * @property {function(number): Node} at - Returns the node at the specified index
 * @property {function(): Node} pop - Removes and returns the last node in the list
 * @property {function(*): boolean} contains - Checks if the list contains the specified value
 * @property {function(*): (number|null)} find - Finds the index of the specified value
 * @property {function(): string} toString - Returns a string representation of the list
 * @property {function(*, number): (Node|void)} insertAt - Inserts a new node at the specified index
 * @property {function(number): Node} removeAt - Removes and returns the node at the specified index
 * @property {function(*=, Node=): Node} node - Creates a new node
 */
function linkedList(listLocationIndex = null) {
  
  let head;
  let tail;
  let size = 0;
  const index = listLocationIndex;

  function ifObjectThenGetKey(value) {
    if (typeof value === 'object') {
      return value.key;
    }
    return value;
  }

  function setHeadTailIfSize0(newNodeReference) {
    if (size === 0) {
      
      head = newNodeReference;
      tail = newNodeReference;
      size++
      return true;
    }
    return false;
  }

  function showStorageArray() {
    const storageArray = []; //initiate outside recursion
    function showStorageArrayCallback(config) {
      const { keyValueArray } = config;
      storageArray.push(keyValueArray);
      
      return storageArray;
    }
    // showStorageArrayCallback = showStorageArrayCallback.bind(null, {
    // storageArray: [] });
    return traverse({
      evaluator: createEvaluator(size - 1),
      caller: showStorageArray,
      callback: showStorageArrayCallback,
    });
  }

  /** @type {{evaluator: Function, callback: Function, currentNode: Symbol,
   * currentIndex: Number, printArray: Array, caller: Function }} */
  function traverse(config) {
    let {
      evaluator,
      callback = null,
      currentNode = head,
      currentIndex = 0,
      printArray = [],
      caller = null,
    } = config;

    if (caller === null) throw new Error('no caller passed to traverse()');
    // TODO: calculate big O for time & space
    // MAYBE: use loop instead
    let stopConditionMet = false;

    let [currentValue, keyValueArray] = [];
    if (currentNode) {
      currentValue = ifObjectThenGetKey(currentNode.value);
    }
    if (currentNode && typeof currentNode.value === 'object') {
      keyValueArray = [currentNode.value.key, currentNode.value.value];
    }
    
    // if (caller === showStorageArray) {
    // const storageArray = [];
    // }

    let thing = [];

    const methodSpecificConfigs = {
      [contains]: { propertyThreshold: currentValue, callbackOptions: {} },
      [find]: { propertyThreshold: currentValue, callbackOptions: currentIndex },
      [at]: { propertyThreshold: currentIndex, callbackOptions: {} },
      [pop]: { propertyThreshold: currentIndex, callbackOptions: {} },
      [toString]: { propertyThreshold: currentIndex, callbackOptions: { printArray, currentNode } },
      [insertAt]: { propertyThreshold: currentIndex, callbackOptions: {} },
      [removeAt]: { propertyThreshold: currentIndex, callbackOptions: {} },
      [showStorageArray]: {
        propertyThreshold: currentIndex,
        callbackOptions: { keyValueArray: keyValueArray },
      },
      // [showStorageArray]: {
      //   propertyThreshold: currentIndex,
      //   callbackOptions: { thing: thing.push('xyz') },
      // },
    };

    
    
    // Defines the 'propertyThreshold' which is the threshold value for
    // 'targetProperty'. The condition will be true when this value is reached
    // or exceeded.
    
    
    const propertyThreshold = ifObjectThenGetKey(methodSpecificConfigs[caller].propertyThreshold);
    

    stopConditionMet = evaluator(propertyThreshold);
    // BASE CASE
    if (stopConditionMet) {
      
      if (callback) {
        return callback(methodSpecificConfigs[caller].callbackOptions);
      }
      return currentNode;
    }
    if (currentNode === tail) {
      
      return currentNode;
    }

    // RECURSIVE CASE

    if (currentNode && typeof currentNode.value === 'object' && caller === showStorageArray) {
      //execute showStorageArrayCallback, which adds to
      callback({ keyValueArray: keyValueArray });
    }

    printArray.push(JSON.stringify(currentNode.value));


    // storageArray.push(keyValueArray);
    // .concat(`( ${currentNode.value} )`, '->');
    currentNode = currentNode.next;
    

    // ??? printArray could be initialized in callback, callback is passed to the
    // next traverse call
    return traverse({
      callback,
      evaluator,
      currentNode,
      currentIndex: currentIndex + 1,
      caller,
      printArray,
      // storageArray,
    });
  }

  function at(targetIndex) {
    isIndexValid(targetIndex);

    const result = traverse({ evaluator: createEvaluator(targetIndex), caller: at });
    return result;
  }
  function pop() {
    if (size <= 0) throw new Error('Cannot pop, size is 0');
    const last = { ...tail };

    tail.value = null;
    const secondToLast = traverse({ evaluator: createEvaluator(size - 2), caller: pop }); // find 2nd to the last element
    secondToLast.next = null;
    // set new tail value
    tail = secondToLast;
    size -= 1;

    return last;
  }
  /**
   * Determines if the target value is present in the current node
   * @example
   * contains(42)
   * true
   * @param {any} targetValue - The value to be checked for presence.
   * @returns {boolean} Returns true if the target value is found, otherwise false.
   * @description
   *   - Uses a traversal function to evaluate nodes.
   *   - Compares the value of the current node with the target value.
   */
  function contains(targetValue) {
    // function containsCallback() {}
    const currentNode = traverse({ evaluator: createEvaluator(targetValue), caller: contains });

    return currentNode.value === targetValue;
  }

  function find(targetValue) {
    
    function findCallback(currentIndex) {
      return currentIndex;
    }
    targetValue = ifObjectThenGetKey(targetValue);
    
    const index = traverse({
      evaluator: createEvaluator(targetValue),
      caller: find,
      callback: findCallback,
    });
    return Number.isInteger(index) ? index : null; // traverse will return currentNode (tail) if nothing is found. If found, it will return an index,
  }

  function toString() {
    if (size <= 0) return this;
    
    
    if (size === 1) {
      
      const finalString = traverse({
        evaluator: createEvaluator(size - 1),
        callback: toStringCallback,
        currentNode: head,
        currentIndex: 0,
        printArray: [],
        caller: toString,
      });
      return finalString;
    }

    function toStringCallback(config) {
      const { printArray, currentNode } = config;
      
      // each node, and print it all at the end

      printArray.push(JSON.stringify(currentNode.value));
      return printArray;
      return `${printArray}( ${currentNode.value} ) -> ` + ' null';
    }

    const toStringResultArray = traverse({
      evaluator: createEvaluator(size - 1),
      callback: toStringCallback,
      currentNode: head,
      currentIndex: 0,
      printArray: [],
      caller: toString,
    });
    // console.trace('toStringResultArray:', toStringResultArray);
    const finalString = toStringResultArray.join('->');

    return finalString;
  }
  function append(targetValue) {
    const newNodeReference = node(targetValue);

    if (setHeadTailIfSize0(newNodeReference)) {
      
      
      return;
    }

    if(size===1){
      head.next = newNodeReference
    }
    
    //set current tail node's next as the new node being appended
    tail.next = newNodeReference;
    //set tail property to the new node
    tail = newNodeReference;
    

    
    size++;

    return newNodeReference;
  }

  function prepend(targetValue) {
    const newNodeReference = node(targetValue, head);

    if(setHeadTailIfSize0(newNodeReference)){
      
      
      return
    };

    head = newNodeReference;
    size++;
    return newNodeReference;
  }

  /**
   * Inserts a new node with the specified value at the given index in the linked list.
   *
   * @param {*} targetValue - The value to be inserted into the linked list.
   * @param {number} targetIndex - The index at which the new node should be inserted.
   * @throws {Error} If the targetIndex is out of bounds (less than 0 or greater than the list length).
   * @returns {void}
   *
   * @example
   * // Assuming a linked list with values [1, 2, 3]
   * insertAt(4, 1);
   * // The list will now be [1, 4, 2, 3]
   *
   * @description
   * This function inserts a new node with the given targetValue at the specified targetIndex.
   * If targetIndex is 0, the new node becomes the head of the list.
   * If targetIndex equals the length of the list, the new node is appended to the end.
   * For any other valid index, the new node is inserted between existing nodes.
   */
  function insertAt(targetValue, targetIndex) {
    
    // isIndexValid(targetIndex);

    if (targetIndex === 0) {
      prepend(targetValue);
      return;
    }
    console.error('head is being duplicated');
    if (targetIndex >= size) {
      //size = 0 then index>= 0
      //size = 1 then index >= 1
      //size = 2 then index >= 2
      console.warn('target index is larger than size');
      append(targetValue);
      return;
    }
    const insertionPoint = traverse({ evaluator: createEvaluator(targetIndex), caller: insertAt });
    const newNode = node(targetValue, insertionPoint.next);
    insertionPoint.next = newNode;
    size += 1;
    return newNode;
  }
  function removeAt(targetIndex) {
    isIndexValid(targetIndex);
    //! !! not sure if this correctly "removes the first"
    if (targetIndex === 0) {
      const target = at(targetIndex);
      head = target.next;
      size -= 1;
      return;
    }

    const nodeBeforeTarget = traverse({
      evaluator: createEvaluator(targetIndex - 1),
      caller: removeAt,
    });
    

    const removalTarget = { ...nodeBeforeTarget.next };
    
    // Link the node before the target to the node afte the target
    nodeBeforeTarget.next = nodeBeforeTarget.next.next;
    // size -= 1;

    
    if (targetIndex === size - 1) {
      
      tail = nodeBeforeTarget;
      
    }
    size -= 1;
    
    return removalTarget;
  }

  function isIndexValid(targetIndex) {
    if (targetIndex + 1 > size) {
      throw new Error('Invalid Index');
    }
  }

  /**
   * @typedef {Object} Node
   * @property {*} value - The value stored in the node
   * @property {Node|null} next - The next node in the list
   */
  function node(value = null, next = null) {
    return { value, next };
  }

  return {
    get index() {
      return index;
    },
    index, // FIXME: try to remove this after testing

    get tail() {
      return tail;
    },
    get head() {
      return head;
    },
    get size() {
      return size;
    },
    append,
    prepend,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
    node,
    showStorageArray,
  };
}

function testLinkedList() {
  

  const list = linkedList();
  // Test append
  
  list.append(1);
  list.append(2);
  list.append(3);
  console.assert(list.size === 3, 'Size should be 3 after appending 3 elements');
  console.assert(list.head.value === 1, 'Head should be 1');
  console.assert(list.tail.value === 3, 'Tail should be 3');

  // Test prepend
  
  list.prepend(0);
  console.assert(list.size === 4, 'Size should be 4 after prepending');
  console.assert(list.head.value === 0, 'Head should be 0 after prepending');

  // Test at
  
  console.assert(list.at(0).value === 0, 'Element at index 0 should be 0');
  console.assert(list.at(2).value === 2, 'Element at index 2 should be 2');

  // Test pop
  
  const popped = list.pop();
  console.assert(popped.value === 3, 'Popped element should be 3');
  console.assert(list.size === 3, 'Size should be 3 after popping');
  console.assert(list.tail.value === 2, 'New tail should be 2');

  // Test contains and find (if implemented)
  if (list.contains && list.find) {
    
    console.assert(list.contains(1) === true, 'List should contain 1');
    console.assert(list.contains(5) === false, 'List should not contain 5');
    console.assert(list.find(0) === 0, 'Index of 0 should be 0');
    console.assert(list.find(2) === 2, 'Index of 2 should be 2');
    console.assert(list.find(5) === null, 'find(5) should return null');
  } else {
    
  }

  // Test toString (if implemented)
  

  if (list.toString) {
    
    
    console.assert(typeof list.toString() === 'string', 'toString should return a string');
  } else {
    
  }

  //   
}

/**
 * Creates an evaluator function for comparing a target property with a given value.
 *
 * @param {Object} config - Configuration object for creating the evaluator.
 * @param {Symbol} config.targetProperty - The name of the property to evaluate.
 * @param {Symbol} config.propertyThreshold - The value to compare against the target property.
 * @returns {Function} A bound evaluator function that can be used for property comparison.
 *
 * @example
 * const config = { targetProperty: size -1};
 * const evaluator = createEvaluator(config);
 *
 * // Later usage (inside traverse() function):
 * evaluator.bind(null, {propertyThreshold: currentIndex})
 *
 * @note The returned evaluator function is partially bound with the targetProperty.
 * Additional arguments can be passed when calling the evaluator within traverse().
 */

function createEvaluator(targetProperty) {
  return function evaluator(propertyThreshold) {
    return targetProperty === propertyThreshold;
  };
}

// Run the tests
// testLinkedList();
const ll = linkedList();
ll.append('first-value')
ll.append('second-value')
ll.append('third-value')






export { linkedList };

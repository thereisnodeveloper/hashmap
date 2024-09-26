// console.log('Linked List package loaded - test!!!');
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
  // console.log('linkedList() called...');
  let head;
  let tail;
  let size = 0;
  const index = listLocationIndex;

  function ifObjectThenGetKey(value) {
    if (typeof value === 'Object') {
      return (value = value.key);
    }
    return value;
  }

  function setHeadTailIfSize0(newNodeReference) {
    if (size === 0) {
      head = newNodeReference;
      tail = newNodeReference;
      return true;
    }
    return false;
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

    // TODO: calculate big O for time & space
    // MAYBE: use loop instead
    let stopConditionMet = false;
    const currentValue = currentNode.value;
    const methodSpecificConfigs = {
      [contains]: { propertyValue: currentValue, callbackOptions: {} },
      [find]: { propertyValue: currentValue, callbackOptions: currentIndex },
      [at]: { propertyValue: currentIndex, callbackOptions: {} },
      [pop]: { propertyValue: currentIndex, callbackOptions: {} },
      [toString]: { propertyValue: currentIndex, callbackOptions: { printArray, currentNode } },
      [insertAt]: { propertyValue: currentIndex, callbackOptions: {} },
      [removeAt]: { propertyValue: currentIndex, callbackOptions: {} },
    };

    // Defines the 'propertyValue' which is the threshold value for
    // 'targetProperty'. The condition will be true when this value is reached
    // or exceeded.
    stopConditionMet = evaluator(methodSpecificConfigs[caller].propertyValue);
    // BASE CASE
    if (stopConditionMet) {
      //   console.log(`stop condition ${stopConditionMet} met`);
      if (callback !== null) {
        return callback(methodSpecificConfigs[caller].callbackOptions);
      }
      return currentNode;
    }
    if (currentNode === tail) return currentNode;

    // RECURSIVE CASE
//!!! be sure to check if this is an object or not
    printArray.push(currentNode.value)
    // .concat(`( ${currentNode.value} )`, '->');
    currentNode = currentNode.next;

    return traverse({
      callback,
      evaluator,
      currentNode,
      currentIndex: currentIndex + 1,
      printArray,
      caller,
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

    function toStringCallback(config) {
      const { printArray, currentNode } = config;
      // console.log('starting toStringCallback');
      //FIXME: maybe pass the 'resultString' as a 'printArray' that contains value of
      //each node, and print it all at the end 
      
      printArray.push(JSON.stringify(currentNode.value))
      return printArray
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
// console.log('toStringResultArray:', toStringResultArray)
    const finalString =  toStringResultArray.join('->')
    

    return finalString
  }
  function append(targetValue) {
    const newNodeReference = node(targetValue);

    setHeadTailIfSize0(newNodeReference);

    tail.next = newNodeReference;

    tail = newNodeReference;
    size++;

    return newNodeReference;
  }

  function prepend(targetValue) {
    const newNodeReference = node(targetValue, head);

    setHeadTailIfSize0(newNodeReference);

    head = newNodeReference;
    size++;
    return newNodeReference;
  }

  function insertAt(targetValue, targetIndex) {
    isIndexValid(targetIndex);
    function insertAtCallback() {}
    if (targetIndex === 0) {
      prepend(targetValue);
      return;
    }
    if (targetIndex === size - 1) {
      append(targetValue);
      return;
    }

    const insertionPoint = traverse({ condition1: targetIndex }, 'insertAt');
    const newNode = node(targetValue, insertionPoint.next);
    insertionPoint.next = newNode;
    size += 1;
    return newNode;
  }

  function removeAt(targetIndex) {
    isIndexValid(targetIndex);
    function removeAtCallback() {}
    if (targetIndex === 0) {
      aList.pop;
      return;
    }

    const nodeBeforeTarget = traverse({ condition1: targetIndex - 1 }, 'removeAt');
    const removalTarget = { ...nodeBeforeTarget.next };
    nodeBeforeTarget.next = nodeBeforeTarget.next.next;
    if (targetIndex === size - 1) {
      tail = nodeBeforeTarget;
      //   console.log('NEW tail:', tail);
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
  };
}

function testLinkedList() {
  console.log('Starting LinkedList Tests');

  const list = linkedList();
  // Test append
  console.log('Testing append...');
  list.append(1);
  list.append(2);
  list.append(3);
  console.assert(list.size === 3, 'Size should be 3 after appending 3 elements');
  console.assert(list.head.value === 1, 'Head should be 1');
  console.assert(list.tail.value === 3, 'Tail should be 3');

  // Test prepend
  console.log('Testing prepend...');
  list.prepend(0);
  console.assert(list.size === 4, 'Size should be 4 after prepending');
  console.assert(list.head.value === 0, 'Head should be 0 after prepending');

  // Test at
  console.log('Testing at...');
  console.assert(list.at(0).value === 0, 'Element at index 0 should be 0');
  console.assert(list.at(2).value === 2, 'Element at index 2 should be 2');

  // Test pop
  console.log('Testing pop...');
  const popped = list.pop();
  console.assert(popped.value === 3, 'Popped element should be 3');
  console.assert(list.size === 3, 'Size should be 3 after popping');
  console.assert(list.tail.value === 2, 'New tail should be 2');

  // Test contains and find (if implemented)
  if (list.contains && list.find) {
    console.log('Testing contains and find...');
    console.assert(list.contains(1) === true, 'List should contain 1');
    console.assert(list.contains(5) === false, 'List should not contain 5');
    console.assert(list.find(0) === 0, 'Index of 0 should be 0');
    console.assert(list.find(2) === 2, 'Index of 2 should be 2');
    console.assert(list.find(5) === null, 'find(5) should return null');
  } else {
    console.log('contains and find methods not implemented, skipping tests');
  }

  // Test toString (if implemented)
  console.log('List as string:', list.toString());

  if (list.toString) {
    console.log('Testing toString...');
    console.log('List as string:', list.toString());
    console.assert(typeof list.toString() === 'string', 'toString should return a string');
  } else {
    console.log('toString method not implemented, skipping test');
  }

  //   console.log('LinkedList Tests Completed');
}

/**
 * Creates an evaluator function for comparing a target property with a given value.
 *
 * @param {Object} config - Configuration object for creating the evaluator.
 * @param {Symbol} config.targetProperty - The name of the property to evaluate.
 * @param {Symbol} config.propertyValue - The value to compare against the target property.
 * @returns {Function} A bound evaluator function that can be used for property comparison.
 *
 * @example
 * const config = { targetProperty: size -1};
 * const evaluator = createEvaluator(config);
 *
 * // Later usage (inside traverse() function):
 * evaluator.bind(null, {propertyValue: currentIndex})
 *
 * @note The returned evaluator function is partially bound with the targetProperty.
 * Additional arguments can be passed when calling the evaluator within traverse().
 */

function createEvaluator(targetProperty) {
  return function evaluator(propertyValue) {
    return targetProperty === propertyValue;
  };
}

// Run the tests
// testLinkedList();

export { linkedList };

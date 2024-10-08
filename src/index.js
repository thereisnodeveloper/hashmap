import HashMap from './hashmap.js'

const test = new HashMap()

// console.log('hash:', hash)

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')


// console.log('%ctesting......', 'color:red')
test.printBuckets()
// console.log('test.loadfactor:', test.loadFactor)

// console.log('test.bucketsArray[4]:', test.bucketsArray[1].showStorageArray())
//!in the linkedlist. Happens when using insertAt(index > 0)
// check 'set'


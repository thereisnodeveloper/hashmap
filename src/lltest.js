class LinkedList {

    constructor() {
        this.head = null; 
    }

   prepend(value) {
    this.head = new Node(value, this.head); 
   }

   append(value) {
    if (this.head == null) {
        this.prepend(value); 
    } else {
        let temp = this.head; 
        while (temp.nextNode != null) {
            temp = temp.nextNode; 
        }
        temp.nextNode = new Node(value); 
    }
   }

   size() {
    let count = 0; 
    let temp = this.head; 
    while (temp != null) {
        temp = temp.nextNode; 
        count += 1; 
    }
    return count; 
   }

   gethead() {
    return this.head.value;  
   }

   toString() {
    let result = []; 
    let temp = this.head; 
    while (temp != null) {
        result.push(temp.value); 
        temp = temp.nextNode; 
    }
    return result.join(' -> '); 
   }

   getTail() {
    let temp = this.head; 
    while (temp != null) {
        console.log('temp',temp)
        temp = temp.nextNode; 
        console.log('temp after moving to next node',temp)

        if (temp.nextNode == null) {
            return temp.value; 
        }
    }
   }

   at(index) {
    let searchIndex = 0; 
    let temp = this.head; 
    while (temp != null) {
        temp = temp.nextNode; 
        searchIndex++;
        if (searchIndex === index) {
            return temp.value; 
        }
    }
   }

   pop() {
    let curr = this.head;
    let prev = this.head; 
    while (curr != null) {
        console.log('curr before reassignment:' , curr)
        prev = curr; 
        curr = curr.nextNode; 
        console.log('prev:', prev)
        console.log('curr:', curr)
      
        if (curr.nextNode == null) {
            console.log('if statement (curr.nextNode == null) triggered')

            prev.nextNode = null; 
            console.log('prev.nextNode:', prev.nextNode)
        }
    }
   }
}

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value; 
        this.nextNode = nextNode;  
    } 
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");


console.log("Current linked list: ", list.toString()); 
console.log("Size of linked list: ", list.size());  
console.log("Head of linked list: ", list.gethead()); 
// console.log("Tail of linked list: ", list.getTail()); 
console.log("Node at index 2: ", list.at(2)); 
console.log("Removing last element from linked list"); 

list.pop(); 
console.log("Current linked list: ", list.toString()); 
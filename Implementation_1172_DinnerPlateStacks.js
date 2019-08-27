/**
 * @param {number} capacity
 */
var DinnerPlates = function(capacity) {
    this.stacks = [];
    this.size = [];
    this.capacity = capacity;
};

/** 
 * @param {number} val
 * @return {void}
 */
DinnerPlates.prototype.push = function(val) {
    let left = this.size.findIndex(s => s < this.capacity);
    if (left === -1) {
        this.stacks.push([]);
        left = this.stacks.length - 1;
    }
    this.stacks[left].unshift(val);
    this.size[left] = (this.size[left] || 0) + 1;
};

/**
 * @return {number}
 */
DinnerPlates.prototype.pop = function() {
    if (!this.stacks.length) return -1;
    const ans = this.stacks[this.stacks.length - 1].shift();
    this.size[this.size.length - 1]--;
    while (this.stacks.length && !this.stacks[this.stacks.length - 1].length) {
        this.stacks.pop();
        this.size.pop();
    }
    return ans;
};

/** 
 * @param {number} index
 * @return {number}
 */
DinnerPlates.prototype.popAtStack = function(index) {
    if (!this.stacks[index].length) return -1;
    this.size[index]--;
    return this.stacks[index].shift();
};


const D = new DinnerPlates(2)
D.push(1);
D.push(2);
D.push(3);
D.push(4);
D.push(5);           // The stacks are now:  2  4
///                                          1  3  5
//                                           ﹈ ﹈ ﹈
console.log(D.popAtStack(0));   // Returns 2.  The stacks are now:     4
//                                                     1  3  5
//                                                     ﹈ ﹈ ﹈
D.push(20);        // The stacks are now: 20  4
//                                         1  3  5
//                                         ﹈ ﹈ ﹈
D.push(21);        // The stacks are now: 20  4 21
//                                         1  3  5
//                                         ﹈ ﹈ ﹈
console.log(D.popAtStack(0));   // Returns 20.  The stacks are now:     4 21
//                                                      1  3  5
//                                                      ﹈ ﹈ ﹈
console.log(D.popAtStack(2));   // Returns 21.  The stacks are now:     4
//                                                      1  3  5
//                                                      ﹈ ﹈ ﹈ 
console.log(D.pop());            // Returns 5.  The stacks are now:      4
//                                                      1  3 
//                                                      ﹈ ﹈  
console.log(D.pop());            // Returns 4.  The stacks are now:   1  3 
//                                                      ﹈ ﹈   
console.log(D.pop());            // Returns 3.  The stacks are now:   1 
//                                                      ﹈   
console.log(D.pop());            // Returns 1.  There are no stacks.
console.log(D.pop());            // Returns -1.  There are still no stacks.
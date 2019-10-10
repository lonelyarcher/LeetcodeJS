/* Implement FreqStack, a class which simulates the operation of a stack-like data structure.

FreqStack has two functions:

push(int x), which pushes an integer x onto the stack.
pop(), which removes and returns the most frequent element in the stack.
If there is a tie for most frequent element, the element closest to the top of the stack is removed and returned.
 

Example 1:

Input: 
["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
Output: [null,null,null,null,null,null,null,5,7,5,4]
Explanation:
After making six .push operations, the stack is [5,7,5,7,4,5] from bottom to top.  Then:

pop() -> returns 5, as 5 is the most frequent.
The stack becomes [5,7,5,7,4].

pop() -> returns 7, as 5 and 7 is the most frequent, but 7 is closest to the top.
The stack becomes [5,7,5,4].

pop() -> returns 5.
The stack becomes [5,7,4].

pop() -> returns 4.
The stack becomes [5,7].
 

Note:

Calls to FreqStack.push(int x) will be such that 0 <= x <= 10^9.
It is guaranteed that FreqStack.pop() won't be called if the stack has zero elements.
The total number of FreqStack.push calls will not exceed 10000 in a single test case.
The total number of FreqStack.pop calls will not exceed 10000 in a single test case.
The total number of FreqStack.push and FreqStack.pop calls will not exceed 150000 across all test cases. */


var FreqStack = function() {
    this.count = {}; //save element and its count
    this.freqs = []; //2 dimension array, each frequency will has a array to save the numbers which frequency is equal to its index.
};

/** 
 * @param {number} x
 * @return {void}
 */
FreqStack.prototype.push = function(x) {
    this.count[x] = (this.count[x] || 0) + 1;
    this.freqs[this.count[x]] = this.freqs[this.count[x]] || [];
    this.freqs[this.count[x]].push(x);
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function() {
    const ans = this.freqs[this.freqs.length - 1].pop();
    this.count[ans]--;
    if (!this.freqs[this.freqs.length - 1].length) this.freqs.pop();
    console.log(ans);
    return ans;
};

/** 
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 */
const stack = new FreqStack();
stack.push(5);
stack.push(7);
stack.push(5);
stack.push(7);
stack.push(4);
stack.push(5);
stack.pop();
stack.pop();
stack.pop();
stack.pop();
console.log("stack2:");
const stack2 = new FreqStack();
stack2.push(4);
stack2.push(0);
stack2.push(9);
stack2.push(3);
stack2.push(4);
stack2.push(2);
stack2.pop();
stack2.push(6);
stack2.pop();
stack2.push(1);
stack2.pop();
stack2.push(1);
stack2.pop();
stack2.push(4);
stack2.pop();
stack2.pop();
stack2.pop();
stack2.pop();
stack2.pop();
stack2.pop();

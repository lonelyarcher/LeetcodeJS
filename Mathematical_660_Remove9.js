/* Start from integer 1, remove any integer that contains 9 such as 9, 19, 29...

So now, you will have a new integer sequence: 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, ...

Given a positive integer n, you need to return the n-th integer after removing. Note that 1 will be the first integer.

Example 1:
Input: 9
Output: 10
Hint: n will not exceed 9 x 10^8. */

/* Let's write the first numbers and try to notice a pattern. Those numbers are:

1, 2, 3, 4, 5, 6, 7, 8,
10, 11, 12, 13, 14, 15, 16, 17, 18,
20, 21, 22, 23, 24, 25, 26, 27, 28,
...
80, 81, 82, 83, 84, 85, 86, 87, 88,
100, 101, 102, ...
These numbers look exactly like all base-9 numbers!

Indeed, every base-9 number is a number in this sequence, and every number in this sequence is a base-9 number.
Both this sequence and the sequence of all base-9 numbers are in increasing order. The answer is therefore just the n-th base-9 number.
 */
/**
 * @param {number} n
 * @return {number}
 */
var newInteger = function(n) {
    const arr = [];
    while(n > 0) {
        arr.unshift(n%9);
        n = ~~(n/9); 
    }
    return arr.reduce((a, c) => a*10 + c);
};

console.log(newInteger(10000000)); //
console.log(newInteger(9)); //10
console.log(newInteger(19)); //20
console.log(newInteger(18)); //20
console.log(newInteger(100)); //119
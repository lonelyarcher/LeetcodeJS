/* Write a program to find the n-th ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. 

Example:

Input: n = 10
Output: 12
Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.
Note:  

1 is typically treated as an ugly number.
n does not exceed 1690. */

/**
 * @param {number} n
 * @return {number}
 */
//DP, a ugly number must be from previous ugly number multiply 2 or 3 or 5.
//base from first ugly 1, put 3 pointers for *2, *3, *5 each
//choose the minimum number, then for next same pointer number, must be immidiately next ugly number * pointer value, so we can increase this pointer by 1 
var nthUglyNumbers = function(n) {
    const ugly = [1];
    let p2 = 0, p3 = 0, p5 = 0;
    for (let i = 1; i < n; i++) {
        const ne = Math.min(2 * ugly[p2], 3 * ugly[p3], 5 * ugly[p5]);
        ugly.push(ne);
        if (ne % 2 === 0) p2++; 
        if (ne % 3 === 0) p3++;
        if (ne % 5 === 0) p5++;
    }
    return ugly;
};

console.log(nthUglyNumbers(10).join());
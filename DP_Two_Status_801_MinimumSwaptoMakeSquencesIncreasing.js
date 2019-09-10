/* We have two integer sequences A and B of the same non-zero length.

We are allowed to swap elements A[i] and B[i].  Note that both elements are in the same index position in their respective sequences.

At the end of some number of swaps, A and B are both strictly increasing.  (A sequence is strictly increasing if and only if A[0] < A[1] < A[2] < ... < A[A.length - 1].)

Given A and B, return the minimum number of swaps to make both sequences strictly increasing.  It is guaranteed that the given input always makes it possible.

Example:
Input: A = [1,3,5,4], B = [1,2,3,7]
Output: 1
Explanation: 
Swap A[3] and B[3].  Then the sequences are:
A = [1, 3, 5, 7] and B = [1, 2, 3, 4]
which are both strictly increasing.
Note:

A, B are arrays with the same length, and that length will be in the range [1, 1000].
A[i], B[i] are integer values in the range [0, 2000]. */

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var minSwap = function(A, B) {
    const n = A.length;
    const swapAt = Array(n).fill(Infinity), notSwapAt = Array(n).fill(Infinity);
    swapAt[0] = A[0] === B[0] ? 0 : 1;
    notSwapAt[0] = 0;
    for (let i = 1; i < n; i++) {
        const swap = A[i] === B[i] ? 0 : 1;
        if (A[i] > A[i - 1] && B[i] > B[i - 1]) {
            swapAt[i] = swap + swapAt[i - 1];
            notSwapAt[i] = notSwapAt[i - 1];
        } 
        if (A[i] > B[i - 1] && B[i] > A[i - 1]) {
            swapAt[i] = Math.min(swapAt[i], swap + notSwapAt[i - 1]); 
            notSwapAt[i] = Math.min(notSwapAt[i], swapAt[i - 1]);
        }
    }
    return Math.min(swapAt[n - 1], notSwapAt[n - 1]);
    
};

console.log(minSwap([0,3,5,8,9], [2,1,4,6,9])); //1
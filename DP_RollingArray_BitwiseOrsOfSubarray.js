/* We have an array A of non-negative integers.

For every (contiguous) subarray B = [A[i], A[i+1], ..., A[j]] (with i <= j), we take the bitwise OR of all the elements in B, obtaining a result A[i] | A[i+1] | ... | A[j].

Return the number of possible results.  (Results that occur more than once are only counted once in the final answer.)

 

Example 1:

Input: [0]
Output: 1
Explanation: 
There is only one possible result: 0.
Example 2:

Input: [1,1,2]
Output: 3
Explanation: 
The possible subarrays are [1], [1], [2], [1, 1], [1, 2], [1, 1, 2].
These yield the results 1, 1, 2, 1, 3, 3.
There are 3 unique values, so the answer is 3.
Example 3:

Input: [1,2,4]
Output: 6
Explanation: 
The possible results are 1, 2, 3, 4, 6, and 7.
 

Note:

1 <= A.length <= 50000
0 <= A[i] <= 10^9 */

/**
 * @param {number[]} A
 * @return {number}
 */
//dp the result set ends at i, accumulate combine all the dp set to the global dp answer.
//use rolling array to save space
//O(n^2), since in the set the possible value are monotonical increasing, the maximum is 32 bit 1, so total will be 32 at most. 32 * n * n = O(n^2), space O(1)
var subarrayBitwiseORs = function(A) {
    let cur = new Set();
    const ans = new Set();
    for (let i = 1; i <= A.length; i++) {
        if (A[i - 1] === A[i - 2]) continue;
        const next = new Set(); 
        next.add(A[i - 1]);
        for (let s of cur) {
            next.add(s | A[i - 1]);
        }
        for (let v of next) ans.add(v);
        cur = next;
    }
    return ans.size;
};
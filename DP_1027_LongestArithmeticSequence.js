/* Given an array A of integers, return the length of the longest arithmetic subsequence in A.

Recall that a subsequence of A is a list A[i_1], A[i_2], ..., A[i_k] with 0 <= i_1 < i_2 < ... < i_k <= A.length - 1, and that a sequence B is arithmetic if B[i+1] - B[i] are all the same value (for 0 <= i < B.length - 1).

 

Example 1:

Input: [3,6,9,12]
Output: 4
Explanation: 
The whole array is an arithmetic sequence with steps of length = 3.
Example 2:

Input: [9,4,7,2,10]
Output: 3
Explanation: 
The longest arithmetic subsequence is [4,7,10].
Example 3:

Input: [20,1,15,3,10,5,8]
Output: 4
Explanation: 
The longest arithmetic subsequence is [20,15,10,5].
 

Note:

2 <= A.length <= 2000
0 <= A[i] <= 10000 */

/**
 * @param {number[]} A
 * @return {number}
 */

var longestArithSeqLength = function(A) {
    const map = A.reduce((a, c, i) => {a[c] = a[c] || []; a[c].push(i); return a;}, {});
    const dp1 = [...Array(A.length)].map(() => Array(10001).fill(1));
    const dp2 = [...Array(A.length)].map(() => Array(10001).fill(1));
    let ans = 1;
    for (let i = 1; i < A.length; i++) {
        for (let j = 0; j < 10000; j++) {
            if (map[A[i] - j]) {
                const pre = biset_left(map[A[i] - j], i);
                if (pre >= 0) dp1[i][j] = dp1[map[A[i] - j][pre]][j] + 1;
            }
            if (map[A[i] + j]) {
                const pre = biset(map[A[i] + j], i) - 1;
                if (pre >= 0) dp2[i][j] = dp2[map[A[i] + j][pre]][j] + 1;
            }
        }
        ans = Math.max(ans, ...dp1[i], ...dp2[i]);
    }
    return ans;
};
//find left insert pos for target,  which mean find last less than x => first GE x  - 1
const biset_left = (arr, target) => {
    let l = 0; r = arr.length;
    while (l < r) {
        const mid = ~~((l + r)/2);
        if (arr[mid] >= target) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l - 1;
};
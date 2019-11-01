/* We are given an array A of N lowercase letter strings, all of the same length.

Now, we may choose any set of deletion indices, and for each string, we delete all the characters in those indices.

For example, if we have an array A = ["babca","bbazb"] and deletion indices {0, 1, 4}, then the final array after deletions is ["bc","az"].

Suppose we chose a set of deletion indices D such that after deletions, the final array has every element (row) in lexicographic order.

For clarity, A[0] is in lexicographic order (ie. A[0][0] <= A[0][1] <= ... <= A[0][A[0].length - 1]), A[1] is in lexicographic order (ie. A[1][0] <= A[1][1] <= ... <= A[1][A[1].length - 1]), and so on.

Return the minimum possible value of D.length.

 

Example 1:

Input: ["babca","bbazb"]
Output: 3
Explanation: After deleting columns 0, 1, and 4, the final array is A = ["bc", "az"].
Both these rows are individually in lexicographic order (ie. A[0][0] <= A[0][1] and A[1][0] <= A[1][1]).
Note that A[0] > A[1] - the array A isn't necessarily in lexicographic order.
Example 2:

Input: ["edcba"]
Output: 4
Explanation: If we delete less than 4 columns, the only row won't be lexicographically sorted.
Example 3:

Input: ["ghi","def","abc"]
Output: 0
Explanation: All rows are already lexicographically sorted.
 

Note:

1 <= A.length <= 100
1 <= A[i].length <= 100 */

/**
 * @param {string[]} A
 * @return {number}
 */
//1. this problem can be convert to find out longest increasing subsequences. O(n^2) for dp, 
//   O(n*logn) for greedy of keeping a increasing list. if incoming char is greater than last index of list, append it. Otherwise replace the first greater one in the list with it.
//   but this greedy solution won't work, since it may have two elements can not be judged, like 'ab' : 'ba', DP can keep both situations for later. so only way is to do DP
//2. for multiple strings in a list, you can treat it same way as one string, just comparing every the string' subsequences at the same position is increasing.
// O(A[0].length^2*A.length) 
var minDeletionSize = function(A) {
    const n = A[0].length;
    const dp = Array(n).fill(1); //max increasing subsequence ends at i
    const greater = (i, j) => {
        for (let k = 0; k < A.length; k++) {
            if (A[k].charCodeAt(i) - A[k].charCodeAt(j) < 0) return false;
        }
        return true;
    };
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (greater(i, j)) dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
    return n - Math.max(...dp);
};

console.log(minDeletionSize(["baabab"]));//2
console.log(minDeletionSize(["babca","bbazb"]));//3
console.log(minDeletionSize(["edcba"]));//4
console.log(minDeletionSize(["ghi","def","abc"]));//0
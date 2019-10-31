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
var minDeletionSize = function(A) {
    const B = A.reduce((a, c) => {
        [...c].forEach((ch, i) => a[i] += ch); 
        return a;
    }, Array(A[0].length).fill(''));
    const dp = Array(B.length + 1).fill(Infinity);
    dp[0] = 0;
    const prior = (s1, s2) => {
        for (let i = 0; i < s1.length; i++) {
            if (s1.charCodeAt(i) - s2.charCodeAt(i) > 0) return false;
        }
        return true;
    };
    for (let i = 1; i <= B.length; i++) {
        dp[i] = i - 1;
        for (let j = i - 1; j > 0; j--) {
            //mistake, need check in case value update by another other in previous step.
            if (prior(B[j - 1], B[i - 1])) dp[i] = Math.min(dp[i], dp[j] + i - j - 1);
        }
    }
    return Math.min(...dp.map((l, i) => l + B.length - i));
};

console.log(minDeletionSize(["baabab"]));//2
console.log(minDeletionSize(["babca","bbazb"]));//3
console.log(minDeletionSize(["edcba"]));//4
console.log(minDeletionSize(["ghi","def","abc"]));//0
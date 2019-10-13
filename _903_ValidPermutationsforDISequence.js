/* 
We are given S, a length n string of characters from the set {'D', 'I'}. (These letters stand for "decreasing" and "increasing".)

A valid permutation is a permutation P[0], P[1], ..., P[n] of integers {0, 1, ..., n}, such that for all i:

If S[i] == 'D', then P[i] > P[i+1], and;
If S[i] == 'I', then P[i] < P[i+1].
How many valid permutations are there?  Since the answer may be large, return your answer modulo 10^9 + 7.

 

Example 1:

Input: "DID"
Output: 5
Explanation: 
The 5 valid permutations of (0, 1, 2, 3) are:
(1, 0, 3, 2)
(2, 0, 3, 1)
(2, 1, 3, 0)
(3, 0, 2, 1)
(3, 1, 2, 0)
 

Note:

1 <= S.length <= 200
S consists only of characters from the set {'D', 'I'}. */

/**
 * @param {string} S
 * @return {number}
 */
//DP, state first i pattern, the last number is j, 0 <= i <= S.length, 0 <= j <= S.length
//init: dp[0][j] = 1, 
//recursive formula: dp[i][j] = S.char(i - 1) === 'D', sum of dp[i - 1][k] k > j, 'I' sum of dp[i - 1][k] k < j
var numPermsDISequence = function(S) {
    const n = S.length;
    const dp = [...Array(n + 1)].map(() => Array(n + 1).fill(0));
    for (let j = 0; j <= n; j++) dp[0][j] = 1;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            if (S.charAt(i - 1) === 'D') {
                for (let k = j + 1; k <= n; k++) {
                    dp[i][j] += dp[i - 1][k];
                }
            } else {
                for (let k = 0; k < j; k++) {
                    dp[i][j] += dp[i - 1][k];
                }
            }
        }
    }
    return dp[n].reduce((a, b) => a + b);
};

console.log(numPermsDISequence('DID')); //5
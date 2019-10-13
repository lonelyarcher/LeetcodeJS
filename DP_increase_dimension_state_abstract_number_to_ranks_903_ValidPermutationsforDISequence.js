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
//DP, the key part is define the state, the idx of S where your matches, it is not enough to recursive. 
//because the following matchs need to how to arrange the order based on the rank of latest number, only rank, you don't need care what the exactly number it is.
//DP always need to know how (i, j) recursively from (i - 1, k), so let think backward, how many ways you can place a latest number i based on latest D/I S.charAt(i - 1). 
//So we define the second dimension j how many existing/used numbers less than the last number, j <= i, there i + 1 number when match to S[i], if last is max, then j can be i at most
//k [0, i - 1]
//init: dp[0][0] = 1
//recursive formula: dp[i][j] = S.char(i - 1) === 'D', sum of dp[i - 1][k]  k [j, i - 1], 'I' sum of dp[i - 1][k] k [0, j)
//O(n^3)
var numPermsDISequence = function(S) {
    const n = S.length, m = 10**9 + 7;
    const dp = [...Array(n + 1)].map(() => Array(n + 1).fill(0));
    dp[0][0] = 1;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= i; j++) {
            if (S.charAt(i - 1) === 'D') {
                for (let k = j; k <= i - 1; k++) {//[j, i - 1] is great than or equal to j, why equal, because the new number i + 1 is less than i which increase one.
                    dp[i][j] = (dp[i][j] + dp[i - 1][k]) % m; 
                }
            } else {
                for (let k = 0; k < j; k++) { //[0, j), last p is I, so k is less than j
                    dp[i][j] = (dp[i][j] + dp[i - 1][k]) % m;
                }
            }
        }
    }
    return dp[n].reduce((a, b) => (a + b) % m);
};

//O(n^2) by preSum
var numPermsDISequence_optimize = function(S) {
    const n = S.length, m = 10**9 + 7;
    const dp = [...Array(n + 1)].map(() => Array(n + 1).fill(0));
    dp[0][0] = 1;
    for (let i = 1; i <= n; i++) {
        const preSum = dp[i - 1].reduce((a, c) => {a.push(a[a.length - 1] + c); return a;}, [0]);
        for (let j = 0; j <= i; j++) {
            if (S.charAt(i - 1) === 'D') {
                dp[i][j] = preSum[i] - preSum[j]; //this is part sum, can be calculate preSum of dp[i - 1], reduce to O(1)
                // for (let k = j; k <= i - 1; k++) {//[j, i - 1] is great than or equal to j, why equal, because the new number i + 1 is less than i which increase one.
                //     dp[i][j] = (dp[i][j] + dp[i - 1][k]) % m; 
                // }
            } else {
                dp[i][j] = preSum[j] - preSum[0];
                // for (let k = 0; k < j; k++) { //[0, j), last p is I, so k is less than j
                //     dp[i][j] = (dp[i][j] + dp[i - 1][k]) % m;
                // }
            }
        }
    }
    return dp[n].reduce((a, b) => (a + b) % m);
};

console.log(numPermsDISequence('DID')); //5
console.log(numPermsDISequence_optimize('DID')); //5
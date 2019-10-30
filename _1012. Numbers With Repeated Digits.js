/* Given a positive integer N, return the number of positive integers less than or equal to N that have at least 1 repeated digit.

 

Example 1:

Input: 20
Output: 1
Explanation: The only positive number (<= 20) with at least 1 repeated digit is 11.
Example 2:

Input: 100
Output: 10
Explanation: The positive numbers (<= 100) with atleast 1 repeated digit are 11, 22, 33, 44, 55, 66, 77, 88, 99, and 100.
Example 3:

Input: 1000
Output: 262
 

Note:

1 <= N <= 10^9 */

/**
 * @param {number} N
 * @return {number}
 */
var numDupDigitsAtMostN = function(N) {
    const ns = N + '';
    const dp = [...Array(ns.length)].map(() => Array(1024).fill(undefined));
    const dfs = (idx, mask, hasZero) => {
        if (idx === 0) return 1;
        if (dp[idx][mask] !== undefined) return dp[idx][mask];

        for (let i = 1; i < 10; i++) {
            if (hasZero && (1<<i & mask) === 0) {
                dfs(idx + 1, mask | 1<<i, true);    
            }
            if (mask <= 1) dfs(idx + 1, mask);
        }
    };
    return dfs(ns.length, 0, false);
};
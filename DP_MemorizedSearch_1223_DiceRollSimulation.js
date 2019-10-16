/* A die simulator generates a random number from 1 to 6 for each roll. You introduced a constraint to the generator such that it cannot roll the number i more than rollMax[i] (1-indexed) consecutive times. 

Given an array of integers rollMax and an integer n, return the number of distinct sequences that can be obtained with exact n rolls.

Two sequences are considered different if at least one element differs from each other. Since the answer may be too large, return it modulo 10^9 + 7.

 

Example 1:

Input: n = 2, rollMax = [1,1,2,2,2,3]
Output: 34
Explanation: There will be 2 rolls of die, if there are no constraints on the die, there are 6 * 6 = 36 possible combinations. In this case, looking at rollMax array, the numbers 1 and 2 appear at most once consecutively, therefore sequences (1,1) and (2,2) cannot occur, so the final answer is 36-2 = 34.
Example 2:

Input: n = 2, rollMax = [1,1,1,1,1,1]
Output: 30
Example 3:

Input: n = 3, rollMax = [1,1,1,2,2,3]
Output: 181
 

Constraints:

1 <= n <= 5000
rollMax.length == 6
1 <= rollMax[i] <= 15 */

/**
 * @param {number} n
 * @param {number[]} rollMax
 * @return {number}
 */
//DP two Dimension, state: i times of rolls and j the last index of dice
//s[i][j] = sum[i - 1] - (sum[i - rollMax[j] - 1] - s[i - rollMax[j] - 1][j])  sum[i - 1] it mean non-restricted times, minus the if has rollmax[j] repeated j in the end.
//so it means minus before i - rollmax[j] time, all the sum except the end with j.
var dieSimulator_dp = function(n, rollMax) {
    const s = [...Array(n + 1)].map(() => Array(6).fill(0));
    const sum = Array(n + 1).fill(0);
    const m = 10 ** 9 + 7;
    s[0].fill(0);
    sum[0] = 1;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < 6; j++) {
            s[i][j] = (sum[i - 1] - (i - rollMax[j] > 0 ? sum[i - rollMax[j] - 1] - s[i - rollMax[j] - 1][j] : 0) + m) % m; 
            sum[i] = (s[i][j] + sum[i]) % m;
        }
    }
    return sum[n];
};
//morizated search, record three dimension state, i - rolls, j - last index, k - last index repeated time
//last step when roll n time, return 1. 
//This solution is much easy to understand 
var dieSimulator = function(n, rollMax) {
    const dp = [...Array(n + 1)].map(() => [...Array(7)].map(() => Array(17).fill(undefined)));
    const m = 10 ** 9 + 7;
    const dfs = (i, j, k) => {
        if (i === n) return 1;
        if (dp[i][j][k] !== undefined) return dp[i][j][k];
        dp[i][j][k] = 0;
        for (let d = 1; d <= 6; d++) {
            if (d !== j) dp[i][j][k] = (dp[i][j][k] + dfs(i + 1, d, 1)) % m;
            else if (k < rollMax[j - 1]) dp[i][j][k] = (dp[i][j][k] + dfs(i + 1, j, k + 1)) % m; 
        }
        return dp[i][j][k];
    };
    return dfs(0, 0, 1);
};

console.log(dieSimulator(n = 2, rollMax = [1,1,2,2,2,3])); //34
console.log(dieSimulator(n = 2, rollMax = [1,1,1,1,1,1])); //30
console.log(dieSimulator(n = 3, rollMax = [1,1,1,2,2,3])); //181

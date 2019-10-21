/* You have some coins.  The i-th coin has a probability prob[i] of facing heads when tossed.

Return the probability that the number of coins facing heads equals target if you toss every coin exactly once.

 

Example 1:

Input: prob = [0.4], target = 1
Output: 0.40000
Example 2:

Input: prob = [0.5,0.5,0.5,0.5,0.5], target = 0
Output: 0.03125
 

Constraints:

1 <= prob.length <= 1000
0 <= prob[i] <= 1
0 <= target <= prob.length
Answers will be accepted as correct if they are within 10^-5 of the correct answer. */

/**
 * @param {number[]} prob
 * @param {number} target
 * @return {number}
 */
//backpack_DP, bottom up,  dp[i][j] is the probability of first i coin to form target j
var probabilityOfHeads = function(prob, target) {
    const dp = [...Array(2)].map(() => Array(target + 1).fill(0));
    dp[0][0] = 1;
    for (let i = 1; i <= prob.length; i++) {
        dp[i % 2][0] = dp[(i - 1) % 2][0] * (1 - prob[i - 1]);
        for (let j = 1; j <= target; j++) {
            dp[i % 2][j] = dp[(i - 1) % 2][j] * (1 - prob[i - 1]) + dp[(i - 1) % 2][j - 1] * prob[i - 1];
        }
    }
    return dp[prob.length % 2][target];
};

console.log(probabilityOfHeads(prob = [0.4], target = 1)); // 0.4
console.log(probabilityOfHeads(prob = [0.5,0.5,0.5,0.5,0.5], target = 0)); //0.03125
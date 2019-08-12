/* You have d dice, and each die has f faces numbered 1, 2, ..., f.

Return the number of possible ways (out of fd total ways) modulo 10^9 + 7 to roll the dice so the sum of the face up numbers equals target.


Constraints:

1 <= d, f <= 30
1 <= target <= 1000 */

/**
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */
const mod = 10 ** 9 + 7;
//top down
//time: O(d*f*target) space: O(target*d)
var numRollsToTarget_memo = function(d, f, target) {
    const cache = [];
    const dfs = (d, target) => {
        if (d === 0 && target === 0) return 1;
        if (d <= 0 || target <= 0) return 0;
        if (cache[d] && cache[d][target] !== undefined) return cache[d][target];
        cache[d] = cache[d] || [];
        cache[d][target] = 0;
        for (let i = 1; i <= f; i++) {
            cache[d][target] += dfs(d - 1, target - i) % mod;
        }
        return cache[d][target];
    }
    return dfs(d, target) % mod;
};

//bottom up, rolling array by mod 2, for this case, bottom up is slower than top down, because target is large as 1000, so the top down recursion is quite sparse, bottom-up calculate many non-used subproblem.
//time: O(d*f*target) space: O(target)
var numRollsToTarget = function(d, f, target) {
    const dp = [...Array(2)].map(() => Array(target + 1).fill(0));
    dp[0][0] = 1;
    for (let i = 1; i <= d; i++) {
        dp[i % 2].fill(0); // when reduce dimension by rolling array, need to reset array before calculating, otherwise it still carry previous value
        for (let j = 1; j <= target; j++) {
            for (let k = 1; k <= f; k++) {
                dp[i % 2][j] += (dp[(i - 1) % 2][j - k] || 0) % mod;
            }
        }
    }
    return dp[d % 2][target] % mod;
};


console.log(numRollsToTarget(d = 1, f = 6, target = 3)); //1
console.log(numRollsToTarget(d = 2, f = 6, target = 7)); //6
console.log(numRollsToTarget(d = 2, f = 5, target = 10)); //1
console.log(numRollsToTarget(d = 1, f = 2, target = 3)); // 0
console.log(numRollsToTarget(30, 30, 500)); //222616187



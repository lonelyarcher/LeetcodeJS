/* You are installing a billboard and want it to have the largest height.  The billboard will have two steel supports, one on each side.  Each steel support must be an equal height.

You have a collection of rods which can be welded together.  For example, if you have rods of lengths 1, 2, and 3, you can weld them together to make a support of length 6.

Return the largest possible height of your billboard installation.  If you cannot support the billboard, return 0.


Note:

0 <= rods.length <= 20
1 <= rods[i] <= 1000
The sum of rods is at most 5000. */

/**
 * @param {number[]} rods
 * @return {number}
 */
//DP, first i rods, how you can build talleast board, dp[i]
//because the two side must be equal height. so when new i come, it is impossible to use exist equal height combination.
//so consider when building the board what is mattering to add the last rods, the defference between two sides, 
//if new rod's length equals to the difference of left and right, then add this rod will be match to ans.
//so we increase the dp dimension, to dp[i][diff] is max height with first i rods and left and right difference: diff
//it can be the combination without the last rod, dp[i - 1][diff]
//or add the last rod on the short side of board, there are two possibilities: 
//1. before diff is rods[i - 1] + diff, add rods[i - 1] then difference became diff
//2. before diff is rods[i - 1] - diff, add rods[i - 1], then the difference became rods[i - 1] - (rods[i - 1] - diff) = diff
//so subequation will be dp(i, diff) = max(subFunc(i - 1, diff), subFunc(i - 1, diff + rods[i - 1]) + rods[i - 1], subFunc(i - 1, rods[i - 1] - diff) + rods[i - 1] - diff);
//memorized search
var tallestBillboard = function(rods) {
    const memo = [];
    const subFunc = (i, diff) => {
        if (i === 0) return diff === 0 ? 0 : -Infinity; 
        memo[i] = memo[i] || [];
        memo[i - 1] = memo[i - 1] || [];
        if (memo[i][diff] !== undefined) return memo[i][diff];
        memo[i][diff] = Math.max(subFunc(i - 1, diff), subFunc(i - 1, diff + rods[i - 1]) + rods[i - 1], subFunc(i - 1, rods[i - 1] - diff) + rods[i - 1] - diff);
        return memo[i][diff];
    }
    return subFunc(rods.length, 0);
};

console.log(tallestBillboard([1,2,3,6]));
//Output: 6
//Explanation: We have two disjoint subsets {1,2,3} and {6}, which have the same sum = 6.


console.log(tallestBillboard([1,2,3,4,5,6]));
//Output: 10
//Explanation: We have two disjoint subsets {2,3,5} and {4,6}, which have the same sum = 10.


console.log(tallestBillboard([1,2]));
//Output: 0
//Explanation: The billboard cannot be supported, so we return 0.

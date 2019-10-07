/* A Stepping Number is an integer such that all of its adjacent digits have an absolute difference of exactly 1. For example, 321 is a Stepping Number while 421 is not.

Given two integers low and high, find and return a sorted list of all the Stepping Numbers in the range [low, high] inclusive.

 

Example 1:

Input: low = 0, high = 21
Output: [0,1,2,3,4,5,6,7,8,9,10,12,21]
 

Constraints:

0 <= low <= high <= 2 * 10^9 */

/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
//DFS, generate all the number then sort to find in scope
var countSteppingNumbers = function(low, high) {
    const ans = low === 0 ? [0] : [];
    const dfs = n => {
        if (n > high) return;
        if (n >= low) ans.push(n);
        const i = n % 10;
        if (i > 0) dfs(n * 10 + i - 1);
        if (i < 9) dfs(n * 10 + i + 1);
    }
    for (let i = 1; i <= 9; i++) dfs(i);
    return ans.sort((a, b) => a - b);
};
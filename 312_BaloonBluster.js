/* Given n balloons, indexed from 0 to n-1. 
Each balloon is painted with a number on it represented by array nums. 
You are asked to burst all the balloons. 
If the you burst balloon i you will get nums[left] * nums[i] * nums[right] coins. 
Here left and right are adjacent indices of i. 
After the burst, the left and right then becomes adjacent.

Find the maximum coins you can collect by bursting the balloons wisely.

Note:

You may imagine nums[-1] = nums[n] = 1. They are not real therefore you can not burst them.
0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100

/**
 * @param {number[]} nums
 * @return {number}
 */

//subproblem recursion, conside the last shooting at k, the left side is from (0, k), the right side is (k, n - 1)
//if we add 1 at beginning and end position
//the border will be kept after shooting 
//so recursion for sub problem will be:
//dp[i][j] = Max(arr[i]*arr[k]*arr[j] + dp[i][k] + dp[k][j]);  k is overlaped, because it will not be shooted until the last one.
//dp[i][j] remove all the elmennt between i, j, after all shooting i and j will left.
//arr is origninal array nums add 1, ...nums, 1
var maxCoins_memorizedSearch = function(nums) {
    const arr = [1, ...nums, 1];
    const n = arr.length;
    const dp = [...Array(n)].map(() => Array(n).fill(undefined));
    const subFunc = (i, j) => {
        if (j - i <= 1) return 0;
        if (dp[i][j] !== undefined) return dp[i][j];
        dp[i][j] = 0;
        for (let k = i + 1; k <= j - 1; k++)  {
            dp[i][j] = Math.max(dp[i][j], subFunc(i, k) + arr[i]*arr[k]*arr[j] + subFunc(k, j))
        }
        return dp[i][j];
    };
    return subFunc(0, n - 1);
}
var maxCoins_dp = function(nums) {
    const arr = [1, ...nums, 1];
    const n = arr.length;
    const dp = [...Array(n)].map(() => Array(n).fill(0));    
    
    for (let len = 2; len < n; len++) { //if len === 1, dp[i][i + 1] = 0, so we begin with 2
        for (let i = 0; i < n - 1; i++) {
            for (let k = i + 1; k < Math.min(i + len, n - 1); k++)  {
                dp[i][i + len] = Math.max(dp[i][i + len], dp[i][k] + arr[i]*arr[k]*arr[i + len] + dp[k][i + len]);
            }
        }
    }
    return dp[0][n - 1];
};

Example:

console.log(maxCoins_dp([3,1,5,8]));
//Output: 167 
//Explanation: nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
//             coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167 */

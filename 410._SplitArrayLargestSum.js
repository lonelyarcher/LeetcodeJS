/* Given an array which consists of non-negative integers and an integer m, 
you can split the array into m non-empty continuous subarrays. 
Write an algorithm to minimize the largest sum among these m subarrays.

Note:
If n is the length of array, assume the following constraints are satisfied:

1 ≤ n ≤ 1000
1 ≤ m ≤ min(50, n)
Examples:



Explanation:
There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8],
where the largest sum among the two subarrays is only 18. 

Three solution, dfs time O(n^m) space O(n), dp time O(n^2*m) space O(n*m), binary search + greedy O(log(sum of nums)), O(n)
*/

/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
//dfs exponential, 2^n
var splitArray_dfs_brute_force = function(nums, m) {
    const n = nums.length;
    if (n === 0) return 0;
    let ans = Infinity;
    const dfs = (i, g, preSum, maxSum) => {
        if (i === n) {
            if (g === m) ans = Math.min(ans, maxSum);
        } else {
            dfs(i + 1, g, preSum + nums[i], Math.max(maxSum, preSum + nums[i]));
            if (g < m) dfs(i + 1, g + 1, nums[i], Math.max(maxSum, nums[i]));
        }
    };
    dfs(1, 1, nums[0], nums[0]);
    return ans;
};
//dp, time n^2*m
var splitArray_DP = function(nums, m) {
    const dp = [...Array(nums.length + 1)].map(() => Array(m + 1).fill(undefined));//begin with all undefined
    dp[0] = Array(m + 1).fill(0); //for empty array, the split sum is zero
    const preSum = nums.reduce((a, c) => [...a, a[a.length - 1] + c], [0]);
    console.log(preSum);
    
    for (let i = 1; i <= nums.length; i++) {
        dp[i][0] = Infinity; 
        //if a non-empty array is splitted to zero group, which is impossible, its sum is infinity.
        //Otherwise, you can always put all the elements in to a zero group, then recursion doesn't work.
        for (let j = 1; j <= m; j++) {
            dp[i][j] = Infinity;
            for (let k = 0; k < i; k++) {
                dp[i][j] = Math.min(dp[i][j], Math.max(dp[k][j - 1], preSum[i] - preSum[k]));
            }
        }
    }
    return dp[nums.length][m];
};
//binary search and greedy, time: n * O(log(sum of nums))
var splitArray = function(nums, m) {
    if (m > nums.length) return null;
    const split = (maxSum) => {
        let g = 1, sum = 0;
        for (let n of nums) {
            if (sum + n > maxSum) {
                sum = 0;
                g++;
            }
            sum += n;
        }
        return g;
    };
    let l = Math.max(...nums), r = nums.reduce((a, c) => a + c);
    while (r - l > 1) { 
        const mid = parseInt(l + (r - l) / 2, 10);
        if (split(mid) <= m) {  // small or equal are good for this maxSum
            r = mid;
        } else {
            l = mid + 1; // larger than m, then maxSum is too small.
        }
    }
    return split(l) <= m ? l : r; //because we know it must have answer, so try small one: l first, if l good, return l , otherwise return r.
};


console.log(splitArray([7,2,5,10,8], 2)); //18
console.log(splitArray([10,5,13,4,8,4,5,11,14,9,16,10,20,8], 8)); //25
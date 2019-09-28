/* Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into k non-empty subsets whose sums are all equal.

 

Example 1:

Input: nums = [4, 3, 2, 3, 5, 2, 1], k = 4
Output: True
Explanation: It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
 

Note:

1 <= k <= len(nums) <= 16.
0 < nums[i] < 10000. */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
//DFS, add the num from nums into a array with k length one by one, every one has four choice
//maintain the i in array will not exceed sum/k, only add when <= sum/k
//if we can add all the numbers , and every group is <= sum/k, which means every group is equal to sum/k, return true
//when add into array, if on position of array is true, then return true
//if loop to the end, still not true, then return false
//recursion make it work, by dfs O(k^n)
var canPartitionKSubsets = function(nums, k) {
    const sum = nums.reduce((a, c) => a + c, 0);
    if (sum % k > 0) return false;
    const part = ~~(sum/k);
    nums.sort((a, b) => b - a);
    if (nums[0] > part) return false;
    
    const dfs = (i, groups) => {
        if (i === nums.length) return true;
        for (let j = 0; j < groups.length; j++) {
            if (groups[j] + nums[i] <= part) {
                groups[j] += nums[i];
                if (dfs(i + 1, groups)) return true;
                groups[j] -= nums[i];
            } 
        }
        return false;
    }
    return dfs(0, Array(k).fill(0));
};

console.log(canPartitionKSubsets([2,2,2,2,3,4,5] ,4)); //false
console.log(canPartitionKSubsets([4,15,1,1,1,1,3,11,1,10], 3)); //true
console.log(canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], k = 4)); //true



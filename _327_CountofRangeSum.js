/* Given an integer array nums, return the number of range sums that lie in [lower, upper] inclusive.
Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j (i ≤ j), inclusive.

Note:
A naive algorithm of O(n2) is trivial. You MUST do better than that.

Example:

Input: nums = [-2,5,-1], lower = -2, upper = 2,
Output: 3 
Explanation: The three ranges are : [0,0], [2,2], [0,2] and their respective sums are: -2, -1, 2. */

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */

 //this problem is first presum, then follow the presum iterating sequence, 
 //keep sorting the previous presum elements
 //and use binary search to find the value range before the selected element of presum
 //time O(n*logn), space O(n)
var countRangeSum = function(nums, lower, upper) {
    
};
//bucket sorting in previous presum elements, use js {} to check the k 
//from presum[i] + lower <= presum[j] <= presum[i] + upper,  j < i, 
//if any k satisfy presum[k] exists, then ans++;
//time O(n*(upper - lower)), space O(n)
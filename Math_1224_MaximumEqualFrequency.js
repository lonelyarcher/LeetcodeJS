/* Given an array nums of positive integers, return the longest possible length of an array prefix of nums, such that it is possible to remove exactly one element from this prefix so that every number that has appeared in it will have the same number of occurrences.

If after removing one element there are no remaining elements, it's still considered that every appeared number has the same number of ocurrences (0).

 

Example 1:

Input: nums = [2,2,1,1,5,3,3,5]
Output: 7
Explanation: For the subarray [2,2,1,1,5,3,3] of length 7, if we remove nums[4]=5, we will get [2,2,1,1,3,3], so that each number will appear exactly twice.
Example 2:

Input: nums = [1,1,1,2,2,2,3,3,3,4,4,4,5]
Output: 13
Example 3:

Input: nums = [1,1,1,2,2,2]
Output: 5
Example 4:

Input: nums = [10,2,8,9,3,8,1,5,2,3,7,6]
Output: 8
 

Constraints:

2 <= nums.length <= 10^5
1 <= nums[i] <= 10^5 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxEqualFreq = function(nums) {
    
    let maxL = 2;
    const count = {}, cc = {};
    for (let i = 0; i < nums.length; i++) {
        const preCount = count[nums[i]] || 0;
        count[nums[i]] = preCount + 1;
        if (preCount !== 0) {
            cc[preCount]--;
            if (cc[preCount] === 0) delete cc[preCount];
        }
        cc[count[nums[i]]] = (cc[count[nums[i]]] || 0) + 1;
        const lens = Object.values(cc);
        if (Object.values(count).length === 1 || (lens.length === 1 && count[nums[0]] === 1) || (lens.length == 2 && (cc[Math.min(Object.keys(cc))] === 1))) maxL = Math.max(maxL, i + 1);
    }
    return maxL;
    
};

console.log(maxEqualFreq([2,2,1,1,5,3,3,5])); //7
console.log(maxEqualFreq([1,1,1,2,2,2,3,3,3,4,4,4,5])); //13
console.log(maxEqualFreq([1,1,1,2,2,2])); //5
console.log(maxEqualFreq([10,2,8,9,3,8,1,5,2,3,7,6])); //8
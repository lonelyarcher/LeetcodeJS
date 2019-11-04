/* Given an array of integers nums and an integer k. A subarray is called nice if there are k odd numbers on it.

Return the number of nice sub-arrays.

 

Example 1:

Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].
Example 2:

Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There is no odd numbers in the array.
Example 3:

Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16
 

Constraints:

1 <= nums.length <= 50000
1 <= nums[i] <= 10^5
1 <= k <= nums.length */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function(nums, k) {
    let r = 0, l = 0, n = nums.length, count = 0, ans = 0;
    //r pointer can move out of index
    while (r <= n && l < n) {      
        if (count < k) {
            count += nums[r++] & 1;
        } else {
            const pr = r;
            while (r < n && count + (nums[r] & 1) === k) { //while loop check the next move first, if valid then move, it will always keep valid
                r++;
            }
            let pl = l;
            while (l < n && count === k) {            
                count -= nums[l++] & 1;
            }
            ans += (r - pr + 1) * (l - pl);
        }
    }
    return ans;
};

console.log(numberOfSubarrays([1,1,2,1,1], k = 3));//2
console.log(numberOfSubarrays([2,4,6], k = 1));//0
console.log(numberOfSubarrays([2,2,2,1,2,2,1,2,2,2], k = 2));//16
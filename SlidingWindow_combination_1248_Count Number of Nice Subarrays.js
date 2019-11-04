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
//sliding window, there is difficulty to move two pointers to count the even numbers before and after the minimum subarray of k odd numbers 
// and resume moving the sliding window. 
var numberOfSubarrays = function(nums, k) {
    let r = 0, l = 0, n = nums.length, count = 0, ans = 0;
    //r pointer can move out of index
    while (r <= n && l < n) {      
        if (count < k) {
            count += nums[r++] & 1;
        } else {
            const pr = r;
            while (r < n && count + (nums[r] & 1) === k) { //while loop 1: check the next move first, only if next valid then move, it will always keep valid
                r++;
            }
            let pl = l;
            while (l < n && count === k) {  //while loop 2: if valid cur then move to next, it will stop at the first invalid position, why? because we want to continue to move the sliding window.         
                count -= nums[l++] & 1;
            }
            ans += (r - pr + 1) * (l - pl);
        }
    }
    return ans;
};

//Better way, we can indexing the odd numbers, then loop the k windows of new odds index array, multiple the even number plus one before and after this window.
var numberOfSubarrays_1 = function(nums, k) {
    const odds = nums.reduce((a, c, i) => {if (c&1 === 1) a.push(i); return a;}, []);
    let ans = 0;
    for (let i = 0; i <= odds.length  - k; i++) {
        const pre = i === 0 ? -1 : odds[i - 1];
        const next = i + k - 1 === odds.length - 1 ? nums.length : odds[i + k];
        ans += (odds[i] - pre) * (next - odds[i + k - 1]);
    }
    return ans;
};

console.log(numberOfSubarrays([1,1,2,1,1], k = 3));//2
console.log(numberOfSubarrays([2,4,6], k = 1));//0
console.log(numberOfSubarrays([2,2,2,1,2,2,1,2,2,2], k = 2));//16

console.log(numberOfSubarrays_1([1,1,2,1,1], k = 3));//2
console.log(numberOfSubarrays_1([2,4,6], k = 1));//0
console.log(numberOfSubarrays_1([2,2,2,1,2,2,1,2,2,2], k = 2));//16
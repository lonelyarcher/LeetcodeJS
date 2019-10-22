/* Median is the middle value in an ordered integer list. 
If the size of the list is even, there is no middle value. 
So the median is the mean of the two middle value.

Examples:
[2,3,4] , the median is 3

[2,3], the median is (2 + 3) / 2 = 2.5

Given an array nums, there is a sliding window of size k 
which is moving from the very left of the array to the very right. 
You can only see the k numbers in the window. 
Each time the sliding window moves right by one position. 
Your job is to output the median array for each window in the original array.

For example,
Given nums = [1,3,-1,-3,5,3,6,7], and k = 3.

Window position                Median
---------------               -----
[1  3  -1] -3  5  3  6  7       1
 1 [3  -1  -3] 5  3  6  7       -1
 1  3 [-1  -3  5] 3  6  7       -1
 1  3  -1 [-3  5  3] 6  7       3
 1  3  -1  -3 [5  3  6] 7       5
 1  3  -1  -3  5 [3  6  7]      6
Therefore, return the median sliding window as [1,-1,-1,3,5,6].

Note:
You may assume k is always valid, ie: k is always smaller than input array's size for non-empty array. */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var medianSlidingWindow = function(nums, k) {
    const window = nums.slice(0, k).sort((a, b) => a - b);
    const median = a => k % 2 === 0 ? (a[k/2 - 1] + a[k/2]) / 2 : a[~~(k/2)];
    const biset = target => {
        let l = 0, r = window.length;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (window[mid] >= target) r = mid;
            else l = mid + 1;
        }
        return l;
    };
    const ans = [median(window)];
    for (let i = 1; i <= nums.length - k; i++) {
        const pre = biset(nums[i - 1]);
        window.splice(pre, 1);
        const cur = biset(nums[i + k - 1])
        window.splice(cur, 0, nums[i + k - 1])
        ans.push(median(window));
    }
    return ans;
};
console.log(medianSlidingWindow([9,7,0,3,9,8,6,5,7,6], 2));//[8.0,3.5,1.5,6.0,8.5,7.0,5.5,6.0,6.5]
console.log(medianSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); //[1,-1,-1,3,5,6]
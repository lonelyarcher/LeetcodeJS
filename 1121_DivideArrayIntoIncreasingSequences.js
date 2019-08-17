/*
Given a non-decreasing array of positive integers nums and an integer K, find out if this array can be divided into 
one or more disjoint increasing subsequences of length at least K.

1 <= nums.length <= 10^5
1 <= K <= nums.length
1 <= nums[i] <= 10^5  */

/**
 * @param {number[]} nums
 * @param {number} K
 * @return {boolean}
 */
var canDivideIntoSubsequences = function(nums, K) {
    let max = 0, count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i === 0 || nums[i] > nums[i - 1]) {
            count = 1;
        } else {
            count++;
        }
        max = Math.max(count, max);
    }
    return nums.length / max >= K;
};

//one line solution
canDivideIntoSubsequences = function(nums, K) {
    return K * Math.max(...Object.values(nums.reduce((a, i) => {a[i] = (a[i]||0) + 1; return a;}, {}))) <= nums.length; // || priority low than +/-
};

let nums = [1,2,2,3,3,4,4], K = 3;
console.log(canDivideIntoSubsequences(nums, K)); //true
//The array can be divided into the two subsequences [1,2,3,4] and [2,3,4] with lengths at least 3 each.

nums = [5,6,6,7,8], K = 3;
console.log(canDivideIntoSubsequences(nums, K)); // false
//There is no way to divide the array using the conditions required.
console.log(canDivideIntoSubsequences([1,1,2,3,4,4], 3)); //true

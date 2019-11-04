/* Given an array nums of positive integers. Your task is to select some subset of nums, multiply each element by an integer and add all these numbers. The array is said to be good if you can obtain a sum of 1 from the array by any possible subset and multiplicand.

Return True if the array is good otherwise return False.

 

Example 1:

Input: nums = [12,5,7,23]
Output: true
Explanation: Pick numbers 5 and 7.
5*3 + 7*(-2) = 1
Example 2:

Input: nums = [29,6,10]
Output: true
Explanation: Pick numbers 29, 6 and 10.
29*1 + 6*(-3) + 10*(-1) = 1
Example 3:

Input: nums = [3,6]
Output: false
 

Constraints:

1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
//Bezout's Identity, ax + by = c, the answer of x, y must have gcd which c % gcd = 0
// so all the array's gcd must 1
//GCD: greatest common divisor: (a, b) = (a%b, b)
//LCM: least common multiple = a * b / gcd(a, b)

var isGoodArray = function(nums) {
    const gcd = (a, b) => {
        if (a < b) return gcd(b, a);
        if (a % b === 0) return b;
        return gcd(a % b, b);
    };
    let divisor = nums[0];
    for (let i = 1; i < nums.length; i++) {
        divisor = gcd(divisor, nums[i]);
        if (divisor === 1) return true;
    }
    return divisor === 1;
};

console.log(isGoodArray([12,5,7,23]));//true
console.log(isGoodArray([29,6,10]));//true
console.log(isGoodArray([3,6]));//false
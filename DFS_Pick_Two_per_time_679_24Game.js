/* You have 4 cards each containing a number from 1 to 9. You need to judge whether they could operated through *, /, +, -, (, ) to get the value of 24.

The division operator / represents real division, not integer division. For example, 4 / (1 - 2/3) = 12.
Every operation done is between two numbers. In particular, we cannot use - as a unary operator. For example, with [1, 1, 1, 1] as input, the expression -1 - 1 - 1 - 1 is not allowed.
You cannot concatenate numbers together. For example, if the input is [1, 2, 1, 2], we cannot write this as 12 + 12. */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
//to avoid parenthesis, so we manual pickup two number to caculate by +-*/, then add the result back to the array, then recurse call until only one number left
//to check result with between 23.999 to 24.001 to void some floating numbers accuracy. like 3,3,8,8
var judgePoint24 = function(nums) {
    if (nums.length === 1) return nums[0] < 24.0001 && nums[0] > 23.9999;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                const left = nums.filter((n, idx) => idx !== i && idx !== j);
                if (judgePoint24([...left, nums[i] + nums[j]]) 
                || judgePoint24([...left, nums[i] - nums[j]]) 
                || judgePoint24([...left, nums[i] * nums[j]]) 
                || (nums[j] !== 0 && judgePoint24([...left, nums[i] / nums[j]]))) return true;
            }
        }
    }
    return false;
};

console.log(judgePoint24([3, 3, 8, 8])); //true 8 / (3 - 3/8)
console.log(judgePoint24([4, 1, 8, 7])); //true (8-4) * (7-1) = 24
console.log(judgePoint24([1, 2, 1, 2])); //false
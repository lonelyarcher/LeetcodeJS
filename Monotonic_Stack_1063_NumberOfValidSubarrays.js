/* Given an array A of integers, return the number of non-empty continuous subarrays that satisfy the following condition:

The leftmost element of the subarray is not larger than other elements in the subarray.

 

Example 1:

Input: [1,4,2,5,3]
Output: 11
Explanation: There are 11 valid subarrays: [1],[4],[2],[5],[3],[1,4],[2,5],[1,4,2],[2,5,3],[1,4,2,5],[1,4,2,5,3].
Example 2:

Input: [3,2,1]
Output: 3
Explanation: The 3 valid subarrays are: [3],[2],[1].
Example 3:

Input: [2,2,2]
Output: 6
Explanation: There are 6 valid subarrays: [2],[2],[2],[2,2],[2,2],[2,2,2].
 

Note:

1 <= A.length <= 50000
0 <= A[i] <= 100000 */

//Monotonic Stack, decreasing
//from the right to left, the left part is begin with empty, new idx(left) can use the right calculated idx before.
//use a array vs[i] to record number of valid subarray begin at i.
//monotonic stack, suppose we have a stack, begin to push num
//the new num only care about the first smaller number to stop the subarray, 
//so once a smaller number comes, it should pop out all the number large than itself from the top.
//once pop out a number, it actually pop out all the valid subarray begin at this popout number.


/**
 * @param {number[]} nums
 * @return {number}
 */
var validSubarrays = function(nums) {
    const st = [];
    const vs = Array(nums.length).fill(1);
    let ans = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        while(st.length > 0 && nums[i] <= nums[st[0]]) { 
            //maintain monotoinc decreasing, only care about latest smaller number.
            vs[i] += vs[st.shift()];//popout a idx, actually popout all the subarray begin at it
        }
        st.unshift(i);//after pop out, place the new idx, still monotonic decreasing
    }
    return vs.reduce((a, c) => a + c);
};

console.log(validSubarrays([1,4,2,5,3]));//11
console.log(validSubarrays([3,2,1]));//3
console.log(validSubarrays([2,2,2]));//6
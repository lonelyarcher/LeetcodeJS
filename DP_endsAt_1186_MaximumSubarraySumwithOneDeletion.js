/* Given an array of integers, return the maximum sum for a non-empty subarray (contiguous elements) with at most one element deletion. In other words, you want to choose a subarray and optionally delete one element from it so that there is still at least one element left and the sum of the remaining elements is maximum possible.

Note that the subarray needs to be non-empty after deleting one element.

 

Example 1:

Input: arr = [1,-2,0,3]
Output: 4
Explanation: Because we can choose [1, -2, 0, 3] and drop -2, thus the subarray [1, 0, 3] becomes the maximum value.
Example 2:

Input: arr = [1,-2,-2,3]
Output: 3
Explanation: We just choose [3] and it's the maximum sum.
Example 3:

Input: arr = [-1,-1,-1,-1]
Output: -1
Explanation: The final subarray needs to be non-empty. You can't choose [-1] and delete -1 from it, then get an empty subarray to make the sum equals to 0.
 

Constraints:

1 <= arr.length <= 10^5
-10^4 <= arr[i] <= 10^4 */

//DP, max subarray with calculte local endsAt[i] and global[i], so for this question, 
//delete a num means split the subarray to two, one endsBefore(i), another startAfter(i)
//both can be DP in O(n)
//then go through, Math.max(endsBefore + deleted/'' + startsAfter, deleted) will be answer
//there is a corner case if arr.length === 1
/**
 * @param {number[]} arr
 * @return {number}
 */
var maximumSum = function(arr) {
    const n = arr.length;
    if (n === 1) return arr[0];
    const endBefore = arr.reduce((a, c) => {a.push(Math.max(a[a.length - 1] + c, c)); return a;}, [0]); //push and return is much more efficient than concat
    const startAfter = arr.slice().reverse().reduce((a, c) => {a.push(Math.max(a[a.length - 1] + c, c)); return a;}, [0]).reverse();//reverse is in place, so make copy before it
    //push O(1) is much faster than unshift, unshift will take O(n) time.
    let ans = -Infinity;
    for (let i = 0; i < n; i++) {
        ans = Math.max(ans, Math.max(endBefore[i] + arr[i] + startAfter[i + 1], endBefore[i] + startAfter[i + 1], arr[i]));
    }
    return ans;
};

console.log(maximumSum([1,-2,0,3])); // 4
console.log(maximumSum([1,-2,-2,3])); //3
console.log(maximumSum([-1,-1,-1,-1])); //-1
/* Given an array A of positive integers, call a (contiguous, not necessarily distinct) subarray of A good if the number of different integers in that subarray is exactly K.

(For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.)

Return the number of good subarrays of A.

 

Example 1:

Input: A = [1,2,1,2,3], K = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
Example 2:

Input: A = [1,2,1,3,4], K = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
 

Note:

1 <= A.length <= 20000
1 <= A[i] <= A.length
1 <= K <= A.length */

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
//this question can not be simply with sliding windows: sliding window need the start and end point be monotonically increasing. 
// that is not true for finding all the number of valid subarray, for example [1,1,1,1] K=1, there is no way to go all the number by sliding window.
//because you can only get the subway ends at 3, or start at 0, no middle [1, 2] as result.
//but we can convert it into two sliding window: find the the subarray which has no more than K distinct items.
//which is find all subarray inside the max length distinct items window.
var subarraysWithKDistinct = function(A, K) {
    return subarraysNoMoreThanKDistinct(A, K) - subarraysNoMoreThanKDistinct(A, K - 1);
};
//Sliding window template, 
// while r <= n && l < n, if (valid state) { update answer first, then move the R pointer and update the state } else {move the l pointer and update state}
// use a count to record the distinct map count's length
const subarraysNoMoreThanKDistinct = (A, K) => {
    let n = A.length, r = 0, l = 0, w = {}, ans = 0, count = 0;
    while (r <= n && l < n) {
        if (count <= K) {
            if (count > 0) ans += r - l;
            if (!w[A[r]] || w[A[r]] === 0) {
                count++;
                w[A[r]] = 0;
            }
            w[A[r++]]++;
        }
        else {
            if (w[A[l]] === 1) count--;
            w[A[l++]]--;      
        }
    }
    return ans;
};
console.log(subarraysWithKDistinct(A = [1,2], K = 1));//2
console.log(subarraysWithKDistinct(A = [2,1,2,1,1], K = 3));//0
console.log(subarraysWithKDistinct(A = [1,2,1,2,3], K = 2));//7
console.log(subarraysWithKDistinct(A = [1,2,1,3,4], K = 3));//3
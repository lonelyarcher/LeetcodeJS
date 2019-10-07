/* Given three integer arrays arr1, arr2 and arr3 sorted in strictly increasing order, 
return a sorted array of only the integers that appeared in all three arrays.

 

Example 1:

Input: arr1 = [1,2,3,4,5], arr2 = [1,2,5,7,9], arr3 = [1,3,4,5,8]
Output: [1,5]
Explanation: Only 1 and 5 appeared in the three arrays.
 

Constraints:

1 <= arr1.length, arr2.length, arr3.length <= 1000
1 <= arr1[i], arr2[i], arr3[i] <= 2000 */

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number[]} arr3
 * @return {number[]}
 */
var arraysIntersection = function(arr1, arr2, arr3) {
    const ans = [];
    let p1 = 0, p2 = 0, p3 = 0;
    while (p1 < arr1.length && p2 < arr2.length && p3 < arr3.length) {
        if (arr1[p1] === arr2[p2] && arr2[p2] === arr3[p3]) {
            ans.push(arr1[p1++]);
            p2++;
            p3++;
        } else {
            const max = Math.max(arr1[p1], arr2[p2], arr3[p3]);
            while (arr1[p1] < max) p1++;
            while (arr2[p2] < max) p2++;
            while (arr3[p3] < max) p3++;
        }
    }
    return ans;
};
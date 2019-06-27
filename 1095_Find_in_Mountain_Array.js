/*You may recall that an array A is a mountain array if and only if:

A.length >= 3
There exists some i with 0 < i < A.length - 1 such that:
A[0] < A[1] < ... A[i-1] < A[i]
A[i] > A[i+1] > ... > A[A.length - 1]
Given a mountain array mountainArr, return the minimum index such that mountainArr.get(index) == target.  If such an index doesn't exist, return -1.

You can't access the mountain array directly.  You may only access the array using a MountainArray interface:

MountainArray.get(k) returns the element of the array at index k (0-indexed).
MountainArray.length() returns the length of the array.
Submissions making more than 100 calls to MountainArray.get will be judged Wrong Answer.  Also, any solutions that attempt to circumvent the judge will result in disqualification.

 

Example 1:

Input: array = [1,2,3,4,5,3,1], target = 3
Output: 2
Explanation: 3 exists in the array, at index=2 and index=5. Return the minimum index, which is 2.
Example 2:

Input: array = [0,1,2,4,2,1], target = 3
Output: -1
Explanation: 3 does not exist in the array, so we return -1.
 

Constraints:

3 <= mountain_arr.length() <= 10000
0 <= target <= 10^9
0 <= mountain_arr.get(index) <= 10^9 */

/**
 * @param {number[]} secret
 * @param {number} target
 * @return {number}
 */

const binarySearch = (arr, l, r, target, cache) => {
    while(l <= r) {
        const mid = Math.trunc(l + (r - l) / 2);
        cache[mid] = cache[mid] !== undefined ? cache[mid] : arr[mid];
        if (cache[mid] === target) return mid;
        if (cache[mid] > target) r = mid - 1;
        else l = mid + 1;
    }
    return -1;
}

var findInMountainArray = function(secret, target) {
    //find the peak
    let l = 0; r = secret.length - 1, peak = -1;
    const cache = {};
    while(l <= r) {
        const mid = Math.trunc(l + (r - l) / 2);
        cache[mid - 1] = cache[mid - 1] !== undefined ? cache[mid - 1] : secret[mid - 1];
        cache[mid + 1] = cache[mid + 1] !== undefined ? cache[mid + 1] : secret[mid + 1];
        cache[mid] = cache[mid] || secret[mid];
        if (cache[mid] > cache[mid - 1] && cache[mid] > cache[mid + 1]) { 
            peak = mid; 
            break; 
        }
        if (cache[mid] > cache[mid + 1]) r = mid - 1;
        else l = mid + 1;
    }
    //find in increasing part
    const ans = binarySearch(secret, 0, peak, target, cache);
    return ans >= 0 ? ans : binarySearch(secret, peak, secret.length - 1, target, cache);
};

console.info(findInMountainArray([1,2,3,4,5,3,1], 3));
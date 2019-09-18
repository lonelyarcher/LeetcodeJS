/* This question is the same as "Max Chunks to Make Sorted" 
except the integers of the given array are not necessarily distinct, 
the input array could be up to length 2000, and the elements could be up to 10**8.

Given an array arr of integers (not necessarily distinct), 
we split the array into some number of "chunks" (partitions), 
and individually sort each chunk.  After concatenating them, 
the result equals the sorted array.

What is the most number of chunks we could have made?

Example 1:

Input: arr = [5,4,3,2,1]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.
For example, splitting into [5, 4], [3, 2, 1] will result in [4, 5, 1, 2, 3], 
which isn't sorted.
Example 2:

Input: arr = [2,1,3,4,4]
Output: 4
Explanation:
We can split into two chunks, such as [2, 1], [3, 4, 4].
However, splitting into [2, 1], [3], [4], [4] is the highest number of chunks possible.
Note:

arr will have length in range [1, 2000].
arr[i] will be an integer in range [0, 10**8]. */

/**
 * @param {number[]} arr
 * @return {number}
 */
//greedy, try to cut the chunks as soon as possible.
//hard part is to find the rule of cut. Always think the last step or final result.
//this time the final result is a sorted array after cut and sort each chunk.
//Compare the cutted chunks with the sorted array, 
//each chunks from i to j should has exactly same chars with sorted array [i, j]
//so use pointer to scan both arr and sorted array, once two scanning point has same char count map
//it means we can cut here.
//then how to track when two subarray has same count map, we can maintain one count map
//orginal array increase char count and sorted decrease it. when all the count equals to zero, means same map count and good to cut.
//we can keep remove if count === 0, then we just need to watch map.size which is O(1)
//total time complexity will be O(nlog(n)) sort
var maxChunksToSorted2 = function(arr) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const map = new Map();
    let ans = 0;
    for (let i = 0; i < arr.length; i++) {
        map.set(arr[i], (map.get(arr[i]) || 0) + 1);
        if (map.get(arr[i]) === 0) map.delete(arr[i]);
        map.set(sorted[i], (map.get(sorted[i]) || 0) - 1);
        if (map.get(sorted[i]) === 0) map.delete(sorted[i]);
        if (map.size === 0) ans++;
    }
    return ans;
};

//O(n), DP, two scaning
//The truth of when you can cut is: the max number in left is less/equal to the min of the right.
//you can first scaning from left to right to get all maxSofar, then scan from right to left to get all the minSofar
var maxChunksToSorted = function(arr) {
    let ans = 0;
    const maxSofar = [0], minSofar = [Infinity], n = arr.length;
    for (let i = 0; i < n; i++) {
        maxSofar.push(Math.max(maxSofar[maxSofar.length - 1], arr[i]));
    }
    for (let i = n - 1; i >= 0; i--) {
        minSofar.unshift(Math.min(minSofar[0], arr[i]));
        if (minSofar[0] >= maxSofar[i]) ans++
    }
    return ans;
};

//console.log(maxChunksToSorted([5,4,3,2,1]));//1
console.log(maxChunksToSorted([2,1,3,4,4]));//4
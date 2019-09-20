/* Given two integer arrays arr1 and arr2, return the minimum number of operations (possibly zero) needed to make arr1 strictly increasing.

In one operation, you can choose two indices 0 <= i < arr1.length and 0 <= j < arr2.length and do the assignment arr1[i] = arr2[j].

If there is no way to make arr1 strictly increasing, return -1.

 

Example 1:

Input: arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]
Output: 1
Explanation: Replace 5 with 2, then arr1 = [1, 2, 3, 6, 7].
Example 2:

Input: arr1 = [1,5,3,6,7], arr2 = [4,3,1]
Output: 2
Explanation: Replace 5 with 3 and then replace 3 with 4. arr1 = [1, 3, 4, 6, 7].
Example 3:

Input: arr1 = [1,5,3,6,7], arr2 = [1,6,3,3]
Output: -1
Explanation: You can't make arr1 strictly increasing.
 

Constraints:

1 <= arr1.length, arr2.length <= 2000
0 <= arr1[i], arr2[i] <= 10^9 */

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
//DP, from left to right, there are two status: the current last position shifted or unshifted.
//so use two arrays to record min shifts so far, the final ans will be min of last position either shift or unshift
//for shifted array, the value shifted from arr2 at last position i should be second dimension, because it affect the future validation
//all possible value is too larger 10^9, so we use arr2 index to record shifted value


var makeArrayIncreasing = function(arr1, arr2) {
    //we first sort and distinct arr2, because the shift if free to choose any element multiple times. 
    arr2 = Array.from(new Set(arr2)).sort((a, b) => a - b);
    //all default to Infinity, because we will take Math.min() operation later
    const shift = [...Array(arr1.length)].map(() => Array(arr2.length).fill(Infinity));
    const unshift = Array(arr1.length).fill(Infinity);
    //init when i = 0
    unshift[0] = 0;
    for (let j = 0; j < arr2.length; j++) shift[0][j] = 1;
    //construct from left i = 1 to right, maintain both unshift and shift
    for (let i = 1; i < arr1.length; i++) {
        if (arr1[i] > arr1[i - 1]) unshift[i] = unshift[i - 1];  //unshift from unshift [i - 1]
        for (let j = 0; j < arr2.length; j++) {
            //Since arr2 is sorted, we can assume the latest shift value at i always GT previous shift i - 1.
            //and it is enough, no need to compare with i - 2, i - 3, ... 
            if (arr1[i] > arr2[j]) unshift[i] = Math.min(unshift[i], shift[i - 1][j]);//unshift from shift[i - 1][j]
            if (arr2[j] > arr1[i - 1]) shift[i][j] =  unshift[i - 1] + 1; // each shift[i] from unshift[i - 1]
            if (j > 0) shift[i][j] = Math.min(shift[i][j], 1 + shift[i - 1][j - 1]);//each shift[i] from previous shift[i - 1][j - 1]       
        }
    }
    const minShift = Math.min(...shift[arr1.length - 1], unshift[arr1.length - 1])
    return minShift === Infinity ? -1 : minShift;   
};

console.log(makeArrayIncreasing(arr1 = [1,5,3,6,7], arr2 = [1,3,2,4])); //1
console.log(makeArrayIncreasing(arr1 = [1,5,3,6,7], arr2 = [4,3,1])); //2
console.log(makeArrayIncreasing(arr1 = [1,5,3,6,7], arr2 = [1,6,3,3])); //-1
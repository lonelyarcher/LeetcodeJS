/* Given a set of numbers, check whether it can be partitioned into two subsets such that the sum of elements in both subsets is same or not.

Constraints: 
arr.length <= 100
0 <= arr[i] <= 1000
*/
const helper = (arr, n , target, cache) => {
    if (target === 0) return true;
    if (n === 0) return target === 0;
    if (cache[n][target]) return cache[n][target];
    cache[n][target] = helper(arr, n-1, target, cache) || helper(arr, n-1, target - arr[n - 1], cache);
    return cache[n][target];
};
const subsetSum = arr => {
    const sum = arr.reduce((a, c) => a + c);
    if (sum & 1 === 1) return false;
    const target = sum/2;
    const cache = Array(arr.length + 1).fill(Array(target + 1).fill(undefined));
    return helper(arr, arr.length, sum/2, cache);
};

console.log(subsetSum([1, 5, 11, 5])); // true
console.log(subsetSum([1, 5, 12, 4])); // true
console.log(subsetSum([1, 3, 5])); //false
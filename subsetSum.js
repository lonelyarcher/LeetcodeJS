/* Given a set of numbers, check whether it can be partitioned into two subsets such that the sum of elements in both subsets is same or not.

Constraints: 
arr.length <= 100
0 <= arr[i] <= 1000
*/

//First to solve the dp problem is to consider the last element of dp array. 
//dp[0-(i-1)] + f(arr[i-1]) include the last element || not include the last element => dp[0-i] 
//dp is assigned to every dp[i] which must ends with last elements arr[i], global Max(dp from 0 to n-1)

//Secondly, escalate the dimension, the problem is to solve a specific case, but we solving by all the cases as a new dimension
//like this problem, to solve the problem when sum are equal in two subset, which means one set's sum == sum(arr)/2
//we escalate this case to universal all possible sum, from 0 to sum of array. which the answer is one of the special case sum/2
//why escalatign dimension is because when we try to subproblem the answer i to [0 to i-1] we need all the cases values to subproblem from 0 to sum.

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
    const cache = [...Array(arr.length + 1)].map(r => Array(target + 1).fill(undefined));
    return helper(arr, arr.length, sum/2, cache);
};

console.log(subsetSum([1, 5, 11, 5])); // true
console.log(subsetSum([1, 5, 12, 4])); // true
console.log(subsetSum([1, 3, 5])); //false
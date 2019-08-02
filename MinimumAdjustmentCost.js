/* Given an integer array, adjust each integers so that the difference of every adjacent integers are not greater than a given number target.
If the array before adjustment is A, the array after adjustment is B, you should minimize the sum of |A[i]-B[i]|
Notice
You can assume each number in the array is a positive integer and not greater than 100.
Example
Given [1,4,2,3] and target = 1, one of the solutions is [2,3,2,3], the adjustment cost is 2 and it's minimal.
Return 2. */

const miniAdjustmentCost = (A, a) => {
    const n = A.length;
    const dp = Array(n + 1).fill(0).map(() => Array(100).fill(Infinity)); 
    //best go to arr.length+1, so 0 means nothing, 1 means one element arr[0], n means with all the elements in arr which length is n.
    dp[0] = Array(100).fill(0);
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j < 100; j++) {
            for (let k = Math.max(j - a, 1); k < Math.min(j + a, 99); k++) {
                dp[i][j] = Math.min(dp[i - 1][k] + Math.abs(j - A[i - 1]), dp[i][j]);
            }
        }
    }
    //console.log(dp.map(r => r.join()).join('|'));
    return dp[n][A[n - 1]];
};

console.log(miniAdjustmentCost([1,4,2,3], 1)); //2
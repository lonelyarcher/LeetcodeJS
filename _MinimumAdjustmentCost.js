/* Given an integer array, adjust each integers so that the difference of every adjacent integers are not greater than a given number target.
If the array before adjustment is A, the array after adjustment is B, you should minimize the sum of |A[i]-B[i]|
Notice
You can assume each number in the array is a positive integer and not greater than 100.
Example
Given [1,4,2,3] and target = 1, one of the solutions is [2,3,2,3], the adjustment cost is 2 and it's minimal.
Return 2. */

const miniAdjustmentCost = (A, a) => {
    const n = A.length;
    const dp = Array(n).fill(0).map(() => Array(100).fill(Infinity));
    const minAdj = (i, t) => {
        const diff = Math.abs(A[i] - t) - a;
        return diff < 0 ? 0 : diff;
    };
    dp[0] = Array(100).fill(0).map((c, i) => minAdj(0, i));
    console.log(dp[0].join());
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < 100; j++) {
            for (let k = Math.max(j - a, 1); k < Math.min(j + a, 99); k++) {
                dp[i][j] = Math.min(dp[i - 1][k] + minAdj(i, j), dp[i][j]);
            }
        }
    }
    console.log(dp[n - 1].join());
    return dp[n - 1][A[n - 1]];
};

console.log(miniAdjustmentCost([1,4,2,3], 1));
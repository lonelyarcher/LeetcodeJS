/* Given an integer array arr, in one move you can select a palindromic subarray arr[i], arr[i+1], ..., arr[j] where i <= j, and remove that subarray from the given array. Note that after removing a subarray, the elements on the left and on the right of that subarray move to fill the gap left by the removal.

Return the minimum number of moves needed to remove all numbers from the array.

 

Example 1:

Input: arr = [1,2]
Output: 2
Example 2:

Input: arr = [1,3,4,1,5]
Output: 3
Explanation: Remove [4] then remove [1,3,1] then remove [5].
 

Constraints:

1 <= arr.length <= 100
1 <= arr[i] <= 20 */

//DP buttom up, by length of range from 1 to n
var minimumMoves = function(arr) {
    const n = arr.length;
    const dp = [...Array(n)].map(() => Array(n).fill(n));
    for (let i = 0; i < n; i++) dp[i][i] = 1;
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            if (arr[i] === arr[i + len - 1]) dp[i][i + len - 1] = i === i + len - 2 ? 1 : dp[i + 1][i + len - 2]; //if len == 2 and two number are same, should take one remove, otherwise i > j
            else {
                for (let k = i; k < i + len - 1; k++) {
                    dp[i][i + len - 1] = Math.min(dp[i][i + len - 1], dp[i][k] + dp[k + 1][i + len - 1]);
                }
            }
        }
    }
    return dp[0][arr.length - 1];
};
//DP momoization, top down
var minimumMoves = function(arr) {
    const n = arr.length;
    const dp = [...Array(n)].map(() => Array(n).fill(Infinity));
    const sub = (i, j) => {
        if (i >= j) return 1;
        if (dp[i][j] !== Infinity) return dp[i][j];
        if (arr[i] === arr[j]) {
            dp[i][j] = sub(i + 1, j - 1);
        } else {
            for (let k = i; k < j; k++) {
                dp[i][j] = Math.min(dp[i][j], sub(i, k) + sub(k + 1, j));
            }
        }
        return dp[i][j];
    };
    return sub(0, arr.length - 1);
};
/* Given a positive integer N, return the number of positive integers less than or equal to N that have at least 1 repeated digit.

 

Example 1:

Input: 20
Output: 1
Explanation: The only positive number (<= 20) with at least 1 repeated digit is 11.
Example 2:

Input: 100
Output: 10
Explanation: The positive numbers (<= 100) with atleast 1 repeated digit are 11, 22, 33, 44, 55, 66, 77, 88, 99, and 100.
Example 3:

Input: 1000
Output: 262
 

Note:

1 <= N <= 10^9 */

/**
 * @param {number} N
 * @return {number}
 */
//DP, Memoization, how many number we can dfs to go on the state (index - left to right  and mask of 0-9 occurrence), dp[index][mask]
//there is two conditions:
// 1. unlimited: if previous (left) digit pick the number less than N's digit, then after that all the digits you can choose any unselected digit, we will cache this results.
// 2. limited: the beginning, and when we pick the N's digit in previous search, then this turn we can only pick 0 to N[idx], and so on
//Time complexity: O(logN*1024*10) = O(logN), Space complexity: O(logN * 1024) = O(logN)
var numDupDigitsAtMostN = function(N) {
    const arr = [...N.toString()].map(s => parseInt(s));
    const dp = [...Array(arr.length)].map(() => Array(1024).fill(undefined)); //mask is 2**10
    const dfs = (idx, mask, limited) => {
        if (idx === arr.length) return 1; //reach the last digit, then a number is found, return 1
        if (!limited && dp[idx][mask] !== undefined) return dp[idx][mask];
        dp[idx][mask] = 0;
        for (let i = 0; i <= (limited ? arr[idx] : 9); i++) {
            if ((1<<i & mask) === 0) {
                dp[idx][mask] += dfs(idx + 1, !i && !mask ? 0 : (1<<i | mask), limited && i === arr[idx]);    
            }
        }
        return dp[idx][mask];
    };
    return N - (dfs(0, 0, true) - 1); //0 is included in non-repeated number
};

console.log(numDupDigitsAtMostN(20)); //1
console.log(numDupDigitsAtMostN(100)); //10
console.log(numDupDigitsAtMostN(1000)); //262
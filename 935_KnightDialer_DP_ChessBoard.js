/* A chess knight can move as indicated in the chess diagram below:

 .           

 

This time, we place our chess knight on any numbered key of a phone pad (indicated above), and the knight makes N-1 hops.  Each hop must be from one key to another numbered key.

Each time it lands on a key (including the initial placement of the knight), it presses the number of that key, pressing N digits total.

How many distinct numbers can you dial in this manner?

Since the answer may be large, output the answer modulo 10^9 + 7.

 

Example 1:

Input: 1
Output: 10
Example 2:

Input: 2
Output: 20
Example 3:

Input: 3
Output: 46
 

Note:

1 <= N <= 5000 */

/**
 * @param {number} N
 * @return {number}
 */
var knightDialer = function(N) {
    const mod = 10**9 + 7;
    const map = {1 : [6, 8], 2 : [7, 9], 3: [4, 8], 6: [0, 1, 7], 9: [4, 2], 0: [4, 6], 8: [1, 3], 7: [2, 6], 4: [3, 9, 0], 5: []};
    const dp = [...Array(N + 1)].map(() => Array(10).fill(1));
    for (let i = 2; i <= N; i++) {
        for (let j = 0; j < 10; j++) {
            dp[i][j] = map[j].reduce((a, c) => a + dp[i-1][c], 0) % mod;
        }
    }
    return dp[N].reduce((a, c) => a + c) % mod;
};

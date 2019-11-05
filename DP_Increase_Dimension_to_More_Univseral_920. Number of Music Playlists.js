/* Your music player contains N different songs and she wants to listen to L (not necessarily different) songs during your trip.  You create a playlist so that:

Every song is played at least once
A song can only be played again only if K other songs have been played
Return the number of possible playlists.  As the answer can be very large, return it modulo 10^9 + 7.

 

Example 1:

Input: N = 3, L = 3, K = 1
Output: 6
Explanation: There are 6 possible playlists. [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1].
Example 2:

Input: N = 2, L = 3, K = 0
Output: 6
Explanation: There are 6 possible playlists. [1, 1, 2], [1, 2, 1], [2, 1, 1], [2, 2, 1], [2, 1, 2], [1, 2, 2]
Example 3:

Input: N = 2, L = 3, K = 1
Output: 2
Explanation: There are 2 possible playlists. [1, 2, 1], [2, 1, 2]
 

Note:

0 <= K < N <= L <= 100 */

/**
 * @param {number} N
 * @param {number} L
 * @param {number} K
 * @return {number}
 */
//increase the dimension strategies: 
//1. find more attributes to define state correctly and in necessary details 
//2. escalate the state, make the finally state just one special case of universal case.
//This question is second case, we define the state as L total songs with N unique song. 
//Then the answer dp[L][N] is just one special case of state.
//state transition: dp[i][j] = dp[i - 1][j - 1] * (N - j + 1) + dp[i - 1][j] * (j - K) if j > K
var numMusicPlaylists = function(N, L, K) {
    const dp = [...Array(L + 1)].map(() => Array(N + 1).fill(undefined));
    for (let j = 0; j <= N; j++) dp[0][j] = 0;
    for (let i = 0; i <= L; i++) dp[i][0] = 0;
    dp[0][0] = 1;
    for (let i = 1; i <= L; i++) {
        for (let j = 1; j <= N; j++) {
            dp[i][j] = dp[i - 1][j - 1]* (N - j + 1);
            if (L > K && j > K) dp[i][j] += dp[i - 1][j] * (j - K);
        }
    }
    return dp[L][N];
};

console.log(numMusicPlaylists(N = 3, L = 3, K = 1));//6
console.log(numMusicPlaylists(N = 2, L = 3, K = 0));//6
console.log(numMusicPlaylists(N = 2, L = 3, K = 1));//2
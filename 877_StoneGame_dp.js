/* Alex and Lee play a game with piles of stones.  There are an even number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].

The objective of the game is to end with the most stones.  The total number of stones is odd, so there are no ties.

Alex and Lee take turns, with Alex starting first.  Each turn, a player takes the entire pile of stones from either the beginning or the end of the row.  This continues until there are no more piles left, at which point the person with the most stones wins.

Assuming Alex and Lee play optimally, return True if and only if Alex wins the game.

 

Example 1:

Input: [5,3,4,5]
Output: true
Explanation: 
Alex starts first, and can only take the first 5 or the last 5.
Say he takes the first 5, so that the row becomes [3, 4, 5].
If Lee takes 3, then the board is [4, 5], and Alex takes 5 to win with 10 points.
If Lee takes the last 5, then the board is [3, 4], and Alex takes 4 to win with 9 points.
This demonstrated that taking the first 5 was a winning move for Alex, so we return true.
 

Note:

2 <= piles.length <= 500
piles.length is even.
1 <= piles[i] <= 500
sum(piles) is odd. */

/**
 * @param {number[]} piles
 * @return {boolean}
 */
// game theory: both player will use optimized strategy, so 
// stones taked by one player from i to j
//dp[i][j] = sum of stones(i to j) - min(dp[i - 1][j], dp[i][j - 1])
//(when he picked, he should pick the pile and make the less for his rival using same strategy will pick)
//sum(i to j) could be pre-calculate by preSum, sum[i][j] = preSum[j + 1] - preSum[i]
//time and space: O(n^2)
var stoneGame = function(piles) {
    const memo = [];
    const preSum = piles.reduce((a, c, i) => {a[i + 1] = a[i] + c; return a;}, [0]);//mistake, preSum calculate need increase idx
    const sub = (i, j) => {
        if (i > j) return 0; //mistake, i: left > j: right, invalid, set to 0
        memo[i] = memo[i] || [];
        if (memo[i][j]) return memo[i][j];
        memo[i][j] = (preSum[j + 1] - preSum[i]) - Math.min(sub(i + 1, j), sub(i, j - 1));
        return memo[i][j]; //mistake: forget to return value
    };
    console.log(sub(0, piles.length - 1));
    return sub(0, piles.length - 1) > preSum[piles.length] / 2; //mistake: forget to return required answer, true or false, not max score.
};

console.log(stoneGame([5,3,4,5])); //true
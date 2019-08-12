/* Alex and Lee continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].  The objective of the game is to end with the most stones. 

Alex and Lee take turns, with Alex starting first.  Initially, M = 1.

On each player's turn, that player can take all the stones in the first X remaining piles,
 where 1 <= X <= 2M.  Then, we set M = max(M, X).

The game continues until all the stones have been taken.

Assuming Alex and Lee play optimally, return the maximum number of stones Alex can get.

 

Example 1:

Input: piles = [2,7,9,4,4]
Output: 10
Explanation:  If Alex takes one pile at the beginning, Lee takes two piles, then Alex takes 2 piles again. Alex can get 2 + 4 + 4 = 10 piles in total. If Alex takes two piles at the beginning, then Lee can take all three piles left. In this case, Alex get 2 + 7 = 9 piles in total. So we return 10 since it's larger. 
 

Constraints:

1 <= piles.length <= 100
1 <= piles[i] <= 10 ^ 4 */

/**
 * @param {number[]} piles
 * @return {number}
 */
//state has two attributes: current position in piles i, last M.
//dp[i][m] = postSum(i to end) - min(dp[i + nm][Math.max(nm, m)] nm is from 1 to 2*m);
//at beginning: m = 1, i = 0;
//end conditions: dp[i === piles.length][any m] = 0 

var stoneGameII = function(piles) {
    const postSum = piles.reduceRight((a, c, i) => {a[i] = (a[i + 1] || 0) + piles[i]; return a;}, []);
    const memo = [];
    const sub = (i, m) => {
        if (i === piles.length) return 0;
        memo[i] = memo[i] || []; //mistake, invalid/end condition need consider more than border, it may beyond the border.
        if (memo[i][m] !== undefined) return memo[i][m];
        memo[i][m] = 0;
        for (let j = 1; j <= 2 * m && i + j <= piles.length; j++) {
            memo[i][m] = Math.max(postSum[i] - sub(i + j, Math.max(j, m)), memo[i][m]); //mistake, sub equation is recursion call sub itself, don't call memorized array/map.
            //miss the Math.max(j, m)), which is specified in question, should be very carefull.
        }
        return memo[i][m];
    };
    return sub(0, 1);
};

console.log(stoneGameII([2,7,9,4,4])); //10
console.log(stoneGameII([8,9,5,4,5,4,1,1,9,3,1,10,5,9,6,2,7,6,6,9])); //56
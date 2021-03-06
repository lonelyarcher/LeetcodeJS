/* In a N x N grid representing a field of cherries, each cell is one of three possible integers.

 

0 means the cell is empty, so you can pass through;
1 means the cell contains a cherry, that you can pick up and pass through;
-1 means the cell contains a thorn that blocks your way.
 

Your task is to collect maximum number of cherries possible by following the rules below:

 

Starting at the position (0, 0) and reaching (N-1, N-1) by moving right or down through valid path cells (cells with value 0 or 1);
After reaching (N-1, N-1), returning to (0, 0) by moving left or up through valid path cells;
When passing through a path cell containing a cherry, you pick it up and the cell becomes an empty cell (0);
If there is no valid path between (0, 0) and (N-1, N-1), then no cherries can be collected.
 

 

Example 1:

Input: grid =
[[0, 1, -1],
 [1, 0, -1],
 [1, 1,  1]]
Output: 5
Explanation: 
The player started at (0, 0) and went down, down, right right to reach (2, 2).
4 cherries were picked up during this single trip, and the matrix becomes [[0,1,-1],[0,0,-1],[0,0,0]].
Then, the player went left, up, up, left to return home, picking up one more cherry.
The total number of cherries picked up is 5, and this is the maximum possible.
 

Note:

grid is an N by N 2D array, with 1 <= N <= 50.
Each grid[i][j] is an integer in the set {-1, 0, 1}.
It is guaranteed that grid[0][0] and grid[N-1][N-1] are not -1. */

/**
 * @param {number[][]} grid
 * @return {number}
 */
//do the forward and backward (reverse) at the same time. so it because two position [i][j] and [k][i+j-k] each step. 
//The last value is decided by first three, so could downgrade the dimension to 3
var cherryPickup = function(grid) { //most time, memo search is easier than dp, but dp may be coding shortly
    const n = grid.length;
    const dp = [...Array(n)].map(() => [...Array(n)].map(() => Array(n).fill(undefined)));
    dp[0][0][0] = grid[0][0];
    const subFunc = (i, j, k) => {
        if (i < 0 || j < 0 || k < 0 || i + j - k < 0 || grid[i][j] === -1 || grid[k][i + j - k] === -1) return -Infinity; //all invalid move set to -Infinite
        if (dp[i][j][k] !== undefined) return dp[i][j][k];
        const cur = i === k ? grid[i][j] : grid[i][j] + grid[k][i + j - k] //if both move into same position, the cherry can be only pick once.
        dp[i][j][k] = Math.max(
            subFunc(i - 1, j, k) + cur,
            subFunc(i - 1, j, k - 1) + cur,
            subFunc(i, j - 1, k) + cur,
            subFunc(i, j - 1, k - 1) + cur
        );
        return dp[i][j][k];
    }
    subFunc(n - 1, n - 1, n - 1);
    return dp[n-1][n-1][n-1] === -Infinity ? 0 : dp[n-1][n-1][n-1];
};

console.log(cherryPickup([[0, 1, -1], 
                          [1, 0, -1], 
                          [1, 1,  1]])); //5
console.log(cherryPickup([[1,1,-1],
                          [1,-1,1],
                          [-1,1,1]])); // 0
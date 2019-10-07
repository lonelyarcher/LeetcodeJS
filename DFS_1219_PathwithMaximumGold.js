/* In a gold mine grid of size m * n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.

Return the maximum amount of gold you can collect under the conditions:

Every time you are located in a cell you will collect all the gold in that cell.
From your position you can walk one step to the left, right, up or down.
You can't visit the same cell more than once.
Never visit a cell with 0 gold.
You can start and stop collecting gold from any position in the grid that has some gold.
 

Example 1:

Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
Output: 24
Explanation:
[[0,6,0],
 [5,8,7],
 [0,9,0]]
Path to get the maximum gold, 9 -> 8 -> 7.
Example 2:

Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
Output: 28
Explanation:
[[1,0,7],
 [2,0,6],
 [3,4,5],
 [0,3,0],
 [9,0,20]]
Path to get the maximum gold, 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.
 

Constraints:

1 <= grid.length, grid[i].length <= 15
0 <= grid[i][j] <= 100
There are at most 25 cells containing gold. */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function(grid) {
    const m = grid.length, n = grid[0].length, seen = [...Array(m)].map(_ => Array(n).fill(false));
    let max = 0;
    const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const dfs = (i, j, g) => {
        const gold = grid[i][j];
        max = Math.max(max, g + gold);
        seen[i][j] = true;
        for (let d of dir) {
            const [ni, nj] = [i + d[0], j + d[1]];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] > 0 && !seen[ni][nj]) dfs(ni, nj, g + gold);
        }
        seen[i][j] = false;
    };
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] > 0) dfs(i, j, 0);
        }
    }
    return max;
};

console.log(getMaximumGold([[0,6,0],[5,8,7],[0,9,0]])); //24
console.log(getMaximumGold([[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]])); //28

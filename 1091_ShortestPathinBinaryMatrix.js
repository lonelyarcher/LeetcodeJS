/**
 * 
 * In an N by N square grid, each cell is either empty (0) or blocked (1).

A clear path from top-left to bottom-right has length k if and only if it is composed of cells C_1, C_2, ..., C_k such that:

Adjacent cells C_i and C_{i+1} are connected 8-directionally (ie., they are different and share an edge or corner)
C_1 is at location (0, 0) (ie. has value grid[0][0])
C_k is at location (N-1, N-1) (ie. has value grid[N-1][N-1])
If C_i is located at (r, c), then grid[r][c] is empty (ie. grid[r][c] == 0).
Return the length of the shortest such clear path from top-left to bottom-right.  If such a path does not exist, return -1.

 

Example 1:

Input: [[0,1],[1,0]]
Output: 2
Example 2:

Input: [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
 

Note:

1 <= grid.length == grid[0].length <= 100
grid[r][c] is 0 or 1
 * 
 * 
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
    //BFS
    if (grid[0][0]) return -1;
    const queue = [[0,0,1]], dir = [[1, 0], [1, 1], [0, 1], [-1, 0], [-1, 1], [-1, -1], [0, -1], [1, -1]];
    const N = grid.length;
    grid[0][0] = 1;
    while(queue.length) {
        const len = queue.length;
        const [cx, cy, dist] = queue.shift();
        if (cx === N - 1 && cy === N - 1) {
            return dist;
        }
        for (const [dx, dy] of dir){
            const nx = cx + dx, ny = cy + dy;
            if (nx >= 0 && nx < N && ny >= 0 && ny < N && grid[nx][ny] === 0) {
                queue.push([nx, ny, dist + 1]);
                grid[nx][ny] = 1;
            }
        }
    }
    return -1;
    
};
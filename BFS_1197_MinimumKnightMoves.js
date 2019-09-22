/* In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square [0, 0].

A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.



Return the minimum number of steps needed to move the knight to the square [x, y].  It is guaranteed the answer exists.

 

Example 1:

Input: x = 2, y = 1
Output: 1
Explanation: [0, 0] → [2, 1]
Example 2:

Input: x = 5, y = 5
Output: 4
Explanation: [0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]
 

Constraints:

|x| + |y| <= 300 */

//BFS, because it is symmetrical, so we can only consider cx >= 0 and cy >= 0;
//at most it go beyond x, y by two more, so cx <= x + 2, cy <= y + 2
//after that ,just follow the BFS template, should be easy

var minKnightMoves = function(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);

    const dir = [[1, -2], [1, 2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, -1], [-2, 1]];
    const seen = [...Array(x + 3)].map(() => Array(y + 3).fill(false));
    seen[0][0] = true;
    let ans = 0;
    const queue = [[0, 0]];
    while (queue.length > 0) {
        const n = queue.length;
        for (let i = 0; i < n; i++) {
            const [cx, cy] = queue.shift();
            if (cx === x && cy === y) return ans;
            for (let d of dir) {
                const nx = cx + d[0], ny = cy + d[1];
                if (nx >= 0 && nx <= x + 2 && ny >= 0 && ny <= y + 2 && !seen[nx][ny]) {
                    queue.push([nx, ny]);
                    seen[nx][ny] = true;
                }
            }
        }
        ans++;
    }
};
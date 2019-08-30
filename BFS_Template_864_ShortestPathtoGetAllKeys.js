/* We are given a 2-dimensional grid. "." is an empty cell, "#" is a wall, "@" is the starting point, ("a", "b", ...) are keys, and ("A", "B", ...) are locks.

We start at the starting point, and one move consists of walking one space in one of the 4 cardinal directions.  We cannot walk outside the grid, or walk into a wall.  If we walk over a key, we pick it up.  We can't walk over a lock unless we have the corresponding key.

For some 1 <= K <= 6, there is exactly one lowercase and one uppercase letter of the first K letters of the English alphabet in the grid.  This means that there is exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

Return the lowest number of moves to acquire all keys.  If it's impossible, return -1.


Note:

1 <= grid.length <= 30
1 <= grid[0].length <= 30
grid[i][j] contains only '.', '#', '@', 'a'-'f' and 'A'-'F'
The number of keys is in [1, 6].  Each key has a different letter and opens exactly one lock. */

/**
 * @param {string[]} grid
 * @return {number}
 */
//BFS is good for shortest path
//each cell can be visit multiple time , so state can not be position x, y only, we need to consider to increase dimension
//the door is not problem, it is not required to open all the door. But the key is, you have to get all the key to win.
//so the state should be [i][j][k]. key is a combination of 6 bit mask, each bit per a key.
//put start state into queue, and begin the BFS, record steps when finish initial batch node in the queue.
//once k = allKeys bit mask, then means get all the keys, return the steps



var shortestPathAllKeys = function(grid) {
    const queue = [], seen = [], m = grid.length, n = grid[0].length, dir = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const add = (r, c, k) => {
        queue.push([r, c, k]);
        seen[r] = seen[r] || [];
        seen[r][c] = seen[r][c] || [];
        seen[r][c][k] = true;
    }; 
    const exist = (r, c, k) => {
        return seen[r] && seen[r][c] && seen[r][c][k];
    }
    const key = (ch, ch0) => 1 << (ch.charCodeAt(0) - ch0.charCodeAt(0));
    let allKeys = 0;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '@') {
                add(r, c, 0);
            }
            if (/^[a-f]$/.test(grid[r][c])) {
                allKeys |= key(grid[r][c], 'a');//calculate the bit mask for all keys combination
            }
        }
    }
    let steps = 0;
    while (queue.length) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            const [r, c, k] = queue.shift();
            //console.log(grid[r][c], k);
            if (k === allKeys) return steps;
            for (let d of dir) {
                const [nr, nc] = [r + d[0], c + d[1]];
                if (grid[nr] && /^[\.\@]$/.test(grid[nr][nc]) && !exist(nr, nc, k)) {   //be careful about variable name, r, c, nr, nc, bit vs char vs index
                    add(nr, nc, k);         //better match patter begin with ^, end with $
                } 
                if (grid[nr] && /^[a-f]$/.test(grid[nr][nc])) {
                    const nk = k | key(grid[nr][nc], 'a');
                    if (!exist(nr, nc, nk)) add(nr, nc, nk);
                }
                if (grid[nr] && /^[A-F]$/.test(grid[nr][nc]) && (k & key(grid[nr][nc], 'A')) && !exist(nr, nc, k)) {
                    add(nr, nc, k);
                }
            }
        }
        steps++;
    }
    return -1;    
};

console.log(shortestPathAllKeys(["@.a.#","###.#","b.A.B"])); //8
console.log(shortestPathAllKeys(["@..aA","..B#.","....b"])); //6

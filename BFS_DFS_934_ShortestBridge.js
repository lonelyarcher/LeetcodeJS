/* In a given 2D binary array A, there are two islands.  (An island is a 4-directionally connected group of 1s not connected to any other 1s.)

Now, we may change 0s to 1s so as to connect the two islands together to form 1 island.

Return the smallest number of 0s that must be flipped.  (It is guaranteed that the answer is at least 1.)

 

Example 1:

Input: [[0,1],[1,0]]
Output: 1
Example 2:

Input: [[0,1,0],[0,0,0],[0,0,1]]
Output: 2
Example 3:

Input: [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
Output: 1
 

Note:

1 <= A.length = A[0].length <= 100
A[i][j] == 0 or A[i][j] == 1 */

/**
 * @param {number[][]} A
 * @return {number}
 */
//dfs to find one island, change to 2 and add them to the queue
//then bfs from this queue to find short distance to another island meet 1
var shortestBridge = function(A) {
    const dir = [[1,0], [0,1], [0,-1], [-1,0]];
    const m = A.length, n = A[0].length;
    const queue = [];
    const dfs = (i, j) => {
        A[i][j] = 2;
        queue.push([i, j]);
        for (let d of dir) {
            const [ni, nj] = [i + d[0], j + d[1]];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && A[ni][nj] === 1) {
                dfs(ni, nj);
            }
        }
    };
    L1: for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (A[i][j] === 1) {
                dfs(i, j);
                break L1;
            }
        }
    }
    
    
    //bfs
    let step = 0;
    while (queue.length) {
        const len = queue.length;
        for (let k = 0; k < len; k++) {
            const [i, j] = queue.shift();
            for (let d of dir) {
                const [ni, nj] = [i + d[0], j + d[1]];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
                    if (A[ni][nj] === 1) return step;
                    if (A[ni][nj] === 0) {
                        A[ni][nj] = 2;
                        queue.push([ni, nj]);
                    }
                }
            }
        }
        step++;
    }
};

console.log(shortestBridge([[0,1],[1,0]]));//1
console.log(shortestBridge([[0,1,0],[0,0,0],[0,0,1]]));//2
console.log(shortestBridge([[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]));//1
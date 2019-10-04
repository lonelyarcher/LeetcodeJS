/* Given an m x n matrix of positive integers representing the height 
of each unit cell in a 2D elevation map, compute the volume of water 
it is able to trap after raining.

 Note:
Both m and n are less than 110.
The height of each unit cell is greater than 0 and is less than 20,000.

 

Example:

Given the following 3x6 height map:
[
  [1,4,3,1,3,2],
  [3,2,1,3,2,4],
  [2,3,3,2,3,1]
]

Return 4.


/**
 * @param {number[][]} heightMap
 * @return {number}
 */



//Greedy with Heap
var trapRainWater = function(heightMap) {
    const m = heightMap.length;
    if (m === 0) return 0;
    const n = heightMap[0].length;
    //mimic heap in javascript, but it take O(n) time to poll
    const heap = [], visited = [...Array(m)].map(() => Array(n).fill(false));
    const removeMinHeight = () => {
        const minIdx = heap.reduce((a, c, i) => c[2] < heap[a][2] ? i : a, 0);
        return heap.splice(minIdx, 1)[0];
    };
    //add all the boundary into the heap   
    for (let j = 0; j < n; j++) {
        heap.push([0, j, heightMap[0][j]]);
        visited[0][j] = true;
        heap.push([m - 1, j, heightMap[m - 1][j]]);
        visited[m - 1][j] = true;
    }
    for (let i = 1; i < m - 1; i++) {
        heap.push([i, 0, heightMap[i][0]]);
        visited[i][0] =  true;
        heap.push([i, n - 1, heightMap[i][n - 1]]);
        visited[i][n - 1] = true;
    }
    let ans = 0;
    const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    while(heap.length) {
        const [i, j, h] = removeMinHeight();
        for (let d of dir) {
            const [ni, nj] = [i + d[0], j + d[1]];
            if (ni < 0 || ni >= m || nj < 0 || nj >= n || visited[ni][nj]) continue;
            const water = Math.max(0, h - heightMap[ni][nj]);
            visited[ni][nj] = true;
            heap.push([ni, nj, heightMap[ni][nj] + water]);
            ans += water;
        }
    }
    return ans;
};

console.log(trapRainWater([[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]])); //4
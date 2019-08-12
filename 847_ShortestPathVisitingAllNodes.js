/* An undirected, connected graph of N nodes (labeled 0, 1, 2, ..., N-1) is given as graph.

graph.length = N, and j != i is in the list graph[i] exactly once, if and only if nodes i and j are connected.

Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.


Note:

1 <= graph.length <= 12
0 <= graph[i].length < graph.length */
/**
 * @param {number[][]} graph
 * @return {number}
 */
var shortestPathLength = function(graph) {
    
    let n = graph.length, ans = Infinity;
    for (let i = 0; i < n; i++) {
        const queue = [[i, 1<<i, 0]]; //[curNode, path, step]
        const visited = [...Array(n)].map(() => Array(1 << n).fill(0));
        visited[i][1<<i] = 1;
        while (queue.length) {
            const [cur, path, step] = queue.shift();
            graph[i].forEach(j => {
                if (!visited[j][path]) {
                    const npath = path | 1 << j;
                    if (npath === 1<<graph.length - 1) ans = Math.min(ans, step + 1);
                    queue.push([j, npath, step + 1]);
                    visited[j][npath] = 1;
                }
            });
        }
    }
    return ans;
}


console.log(shortestPathLength([[1,2,3],[0],[0],[0]])); //4 [1,0,2,0,3]
console.log(shortestPathLength([[1],[0,2,4],[1,3,4],[2],[1,2]])); //4 [0,1,4,2,3]


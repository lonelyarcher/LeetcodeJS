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
    const bfs = (queue, visited) => {
        let step = 0;
        while (queue.length) {
            let len = queue.length;
            while(len-- > 0) {
                const i = queue.shift();
                graph[i].forEach(j => {
                    if (!visited[j]) {
                        queue.push(j);
                        visited[j] = 1;
                    }
                });
            }
            
            if (visited.every(i => i)) return step;
        }
        return Infinity;
    }
    let ans = Infinity;
    for (let i = 0; i < graph.length; i++) {
        const visited = Array(graph.length).fill(0);
        visited[i] = 1;
        ans = Math.min(bfs([i], visited), ans);
    }
    return ans;
};


console.log(shortestPathLength([[1,2,3],[0],[0],[0]])); //4 [1,0,2,0,3]
console.log(shortestPathLength([[1],[0,2,4],[1,3,4],[2],[1,2]])); //4 [0,1,4,2,3]


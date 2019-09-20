/* Starting with an undirected graph (the "original graph") with nodes from 0 to N-1, subdivisions are made to some of the edges.

The graph is given as follows: edges[k] is a list of integer pairs (i, j, n) such that (i, j) is an edge of the original graph,

and n is the total number of new nodes on that edge. 

Then, the edge (i, j) is deleted from the original graph, n new nodes (x_1, x_2, ..., x_n) are added to the original graph,

and n+1 new edges (i, x_1), (x_1, x_2), (x_2, x_3), ..., (x_{n-1}, x_n), (x_n, j) are added to the original graph.

Now, you start at node 0 from the original graph, and in each move, you travel along one edge. 

Return how many nodes you can reach in at most M moves.

Note:

0 <= edges.length <= 10000
0 <= edges[i][0] < edges[i][1] < N
There does not exist any i != j for which edges[i][0] == edges[j][0] and edges[i][1] == edges[j][1].
The original graph has no parallel edges.
0 <= edges[i][2] <= 10000
0 <= M <= 10^9
1 <= N <= 3000
A reachable node is a node that can be travelled to using at most M moves starting from node 0. */

/**
 * @param {number[][]} edges
 * @param {number} M
 * @param {number} N
 * @return {number}
 */
//BFS on original nodes
var reachableNodes = function(edges, M, N) {
    const queue = [[0, M]];
    const adj = edges.reduce((a, c) => {
        a[c[0]].push([c[1], c[2] + 1]);
        a[c[1]].push([c[0], c[2] + 1]);
        return a;
    }, [...Array(N)].map(() => []));
    let ans = 0;
    const seenEdges = [...Array(N)].map(() => Array[N].fill(false));
    while(queue.length > 0) {
        const [node, moves] = queue.shift();
        for (let [next, cost] of adj[node]) {
            if (!seen[node][next]) {

                if (cost <= moves) {
                    queue.add([next, moves - cost]);
                    seen[node][next]
            }
        }
    }
};

console.log(reachableNodes(edges = [[0,1,4],[1,2,6],[0,2,8],[1,3,1]], M = 10, N = 4));//23
console.log(reachableNodes(edges = [[0,1,10],[0,2,1],[1,2,2]], M = 6, N = 3));//13
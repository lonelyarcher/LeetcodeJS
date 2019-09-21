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
//Graph Problem: first generate adjacency list. G : list of neighbour with the weight
//Dijkstra on original nodes, find out how many original nodes it can be reached from 0;
//Node_State will be current Node and total cost from 0 to the current node
//settled record all polled min nodes
//if poll out the node which is already settled, just continue to next poll
//when moves not enough to move to next node, then stop

//While dijkstra, not only recording seen Nodes, but also recording seen edges
//whenever visit a edge (even it is to a settled node), record it visited nodes (include sub nodes) into the seenEdges map
//because you can go from one end or from another end, so we record both direction as n1*N + n2 (key)
//when dijkstra finished, we can calculate all the edges at the end
//for each edge we visited, take the max lengths of one direction and another, add it up but not exceeding the total n of this edge
const popMin = arr => {
    let idx = 0;
    for ([i, c] of arr.entries()) {
        if (c[1] < arr[idx][1]) idx = i;
    }
    return arr.splice(idx, 1)[0]; 
}

var reachableNodes = function(edges, M, N) {
    const queue = [[0, 0]];
    const adj = edges.reduce((a, c) => {
        a[c[0]].push([c[1], c[2]]);
        a[c[1]].push([c[0], c[2]]);
        return a;
    }, [...Array(N)].map(() => []));
    let ans = 0;
    const dist = Array(N).fill(Infinity);
    const settled = Array(N).fill(false);
    dist[0] = 0;
    const seenEdges = {};
    while(queue.length > 0) {
        const [node, d] = popMin(queue);
        if (settled[node]) continue;
        settled[node] = true;
        ans++;
        for (let [next, cost] of adj[node]) {
            const k = node*N + next;
            seenEdges[k] = Math.max((seenEdges[k] || 0), Math.min(M - d, cost));
            if (!settled[next] && d + cost + 1 <= M && d + cost + 1 < dist[next]) {
                dist[next] = d + cost + 1;
                queue.push([next, d + cost + 1]);
            }
        }
    }
    for (let [i, j, n] of edges) {
        const k = i * N + j, rk = i + j * N;
        ans += Math.min(n, (seenEdges[k] || 0) + (seenEdges[rk] || 0));
    }
    return ans;
};

console.log(reachableNodes([[0,3,8],[0,1,4],[2,4,3],[1,2,0],[1,3,9],[0,4,7],[3,4,9],[1,4,4],[0,2,7],[2,3,1]], 8, 5)) //40
console.log(reachableNodes(edges = [[0,1,10],[0,2,1],[1,2,2]], M = 6, N = 3));//13

console.log(reachableNodes(edges = [[0,1,4],[1,2,6],[0,2,8],[1,3,1]], M = 10, N = 4));//23

console.log(reachableNodes([[1,2,4],[1,4,5],[1,3,1],[2,3,4],[3,4,5]], 17, 5)); //1


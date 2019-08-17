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

//Binary Search for hard question, try all the possible answer range 0 - N, use binary search to find correct ans.

//because this path can pass multiple times on one node, so it is different than our traditional BFS or DFS, each node only be visited once.
//But we still need a unique state to avoid search repeat and go into infinite loop.
//so here unique state could be [current node, the visiting path of which node is visited and not visited], because of graph.length range is <= 12
//we can use a bit mask to represents the path, 0 unvisited, 1 visited index,  1<<n - 1 will be the final target state when all the node are visited.
//we still can use queue.size as batch of steps, finishing one batch means one step for all the nodes in queue.
//once on node's path === 1111..11, then we get the steps to return.
//every node will have different step to visiting all the other nodes, so we can save time by add all the node into the stack
//then each node will begin search and carry its own path as visiting map. once one of them succeed, we get the minimum steps.
//we can add all nodes as begin because we have each node with its own state, not a global visited array/map for all.
//this type BFS, with each carry a path, and globle record a combination [current node, and its path] as key to visit map. 
//It is helps to solve this type node can be visit multiple times problem.


var shortestPathLength = function(graph) {
    let n = graph.length;
    const queue = [];
    const visited = [...Array(n)].map(() => Array(1 << n).fill(0));//global visited state map, two dimension: current node and its path
        
    for (let i = 0; i < n; i++) {
        queue.push([i, 1<<i]); //[curNode, path], no need to record steps, step will be recorded as BFS queue batch times.
        visited[i][1<<i] = 1;
    }
    let step = 0;
    while (queue.length) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            const [cur, path] = queue.shift();
            if (path === (1<<n) - 1) return step;
            graph[cur].forEach(j => {   //Mistake: don't use return in forEach to break the loop, it will not, only throw exception will
                const npath = path | (1 << j);
               /*  if (npath === (1<<n) - 1) {
                    console.log(npath);
                    return step + 1;
                } */
                if (!visited[j][npath]) {
                    queue.push([j, npath]);
                    visited[j][npath] = 1;
                }
            });
        }
        step++;
    }
    return 0;
}


console.log(shortestPathLength([[1,2,3],[0],[0],[0]])); //4 [1,0,2,0,3]
console.log(shortestPathLength([[1],[0,2,4],[1,3,4],[2],[1,2]])); //4 [0,1,4,2,3]


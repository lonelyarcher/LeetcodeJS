/* There are N network nodes, labelled 1 to N.

Given times, a list of travel times as directed edges times[i] = (u, v, w), 
where u is the source node, v is the target node, 
and w is the time it takes for a signal to travel from source to target.

Now, we send a signal from a certain node K. 
How long will it take for all nodes to receive the signal? 
If it is impossible, return -1.

Note:

N will be in the range [1, 100].
K will be in the range [1, N].
The length of times will be in the range [1, 6000].
All edges times[i] = (u, v, w) will have 1 <= u, v <= N and 0 <= w <= 100. */

//BellmanFord Algorithms, O(N^2), but can handle negative weight
//init the dist for all to infinity, dist[source] = 0
//loop for N - 1 times
//for each edge, relax the dist, dist[to] = Math.min(dist[to], dist[from] + cost)
//then you get all min dist[] from source
/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime_BellmanFord = function(times, N, K) { 
    const dist = Array(N + 1).fill(Infinity);
    dist[K] = 0;
    for (let i = 1; i < N; i++) {
        for (let [u, v, w] of times) {
            dist[v] = Math.min(dist[u] + w, dist[v]);
        }
    }
    let ans = Math.max(...dist.slice(1));
    return ans === Infinity ? -1 : ans;
};

//Dijkstra (dist[], adj list, settled, heap, source)
//0.init all dist to infinity except source 0, settled = new Set(), heap = []
//1.put [source, d=0] into heap
//2.while (heap.length > 0 && settled.size === N) poll the min node from heap
//3.settle add min node, loop all his neighbour
//4.if neighbour not in settled, update dist[neighbour], push into the heap
const removeMin = arr => {
    let min = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i][1] < arr[min][1]) min = i;
    }
    return arr.splice(min, 1)[0];
}
const networkDelayTime_Dijkstra = function(times, N, K) { 
    const dist = Array(N).fill(Infinity);
    dist[K - 1] = 0;
    const adj = times.reduce((a, c) => {
        a[c[0] - 1].push([c[1] - 1, c[2]]);
        return a;
    }, [...Array(N)].map(() => []));
    const settled = new Set();
    
    const heap = [[K - 1, 0]];
    while (settled.size < N && heap.length > 0) {
        const [node, d] = removeMin(heap);
        if (settled.has(node)) continue;
        settled.add(node);
        for (let [next, cost] of adj[node]) {
            if ((!settled.has(next)) && d + cost < dist[next]) {
                dist[next] = d + cost;
                heap.push([next, dist[next]]);
            }
        }
    }
    let ans = Math.max(...dist);
    return ans === Infinity ? -1 : ans;
};

console.log(networkDelayTime_Dijkstra([[2,1,1],[2,3,1],[3,4,1]], N = 4, K = 2)); //2

console.log(networkDelayTime_Dijkstra([[1,2,1]],2,2));//-1
console.log(networkDelayTime_Dijkstra([[2,4,10],[5,2,38],[3,4,33],[4,2,76],[3,2,64],[1,5,54],[1,4,98],[2,3,61],[2,1,0],[3,5,77],[5,1,34],[3,1,79],[5,3,2],[1,2,59],[4,3,46],[5,4,44],[2,5,89],[4,5,21],[1,3,86],[4,1,95]],5,1));//69
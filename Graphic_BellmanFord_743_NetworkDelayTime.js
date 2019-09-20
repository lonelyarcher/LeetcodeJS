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
/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime = function(times, N, K) {
    
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
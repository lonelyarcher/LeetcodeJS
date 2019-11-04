/* Given an undirected tree, return its diameter: the number of edges in a longest path in that tree.

The tree is given as an array of edges where edges[i] = [u, v] is a bidirectional edge between nodes u and v.  Each node has labels in the set {0, 1, ..., edges.length}.

 

Example 1:



Input: edges = [[0,1],[0,2]]
Output: 2
Explanation: 
A longest path of the tree is the path 1 - 0 - 2.
Example 2:



Input: edges = [[0,1],[1,2],[2,3],[1,4],[4,5]]
Output: 4
Explanation: 
A longest path of the tree is the path 3 - 2 - 1 - 4 - 5.
 

Constraints:

0 <= edges.length < 10^4
edges[i][0] != edges[i][1]
0 <= edges[i][j] <= edges.length
The given edges form an undirected tree. */

/**
 * @param {number[][]} edges
 * @return {number}
 */
//Recursion, dfs return the longest path and the second longest path of a subtree
//then diameter = Max (longest + second longest)
var treeDiameter = function(edges) {
    if (edges <= 2) return edges.length;
    const adj = {};
    for (let [a, b] of edges) {
        adj[a] = adj[a] || [];
        adj[a].push(b);
        adj[b] = adj[b] || [];
        adj[b].push(a);
    }
    let max = 0;
    const dfs = (parent, i) => {
        let len1 = 0, len2 = 0; //maintain longest len1 and second longest len2
        for (let ne of adj[i]) {
            if (ne !== parent) {
                const [l1, l2] = dfs(i, ne);
                if (l1 > len1) {
                    len2 = len1; //shift len1 to len2, l1 equal to new longest 
                    len1 = l1;
                } else if (l1 > len2) {
                    len2 = l1;
                }
            }
        }
        max = Math.max(max, len1 + len2);
        return [1 + len1, 1 + len2];
    };
    dfs(null, 0);
    return max;
};


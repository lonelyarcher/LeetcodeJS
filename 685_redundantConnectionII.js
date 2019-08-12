/**
In this problem, a rooted tree is a directed graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents.

The given input is a directed graph that started as a rooted tree with N nodes (with distinct values 1, 2, ..., N), with one additional directed edge added. The added edge has two different vertices chosen from 1 to N, and was not an edge that already existed.

The resulting graph is given as a 2D-array of edges. Each element of edges is a pair [u, v] that represents a directed edge connecting nodes u and v, where u is a parent of child v.

Return an edge that can be removed so that the resulting graph is a rooted tree of N nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array.

Example 1:
Input: [[1,2], [1,3], [2,3]]
Output: [2,3]
Explanation: The given directed graph will be like this:
  1
 / \
v   v
2-->3
Example 2:
Input: [[1,2], [2,3], [3,4], [4,1], [1,5]]
Output: [4,1]
Explanation: The given directed graph will be like this:
5 <- 1 -> 2
     ^    |
     |    v
     4 <- 3
Note:
The size of the input 2D-array will be between 3 and 1000.
Every integer represented in the 2D-array will be between 1 and N, where N is the size of the input array.


  @param {number[][]} edges
  @return {number[]}
 **/

//There is two situations: 
//1: one node has two parents, like example 1 node 3. we just need remove the seconde edge which cause trouble, 2 -> 3.
//2: There is a cycle, in this cycle, remove the last edge which forms cycle as example 2, remove 4 -> 1
//3: There are both cycle and two parents node, then need remove the edge both in cycle and two parent node.

// By Union Find, iterate the edge [from, to], add the to's parent to from, with compression. If 'to' has a non-self parent and is not equal to from's, then 'to' has two parent, need remove one.
// if to already has the same parent with to, then there is a cycle. We need check whether there is a double parent node, if has, remove the edge in both, if not, remove this edge.
var findRedundantDirectedConnection = function(edges) {
    let cycleEdge = null, doubleParentEdge = null;
    const p = Array(edges.length + 2).fill(0).map((v, i) => i);
    const find = v => {
        if (p[v] !== v) {
            p[v] = find(p[v]);
        }
        return p[v];
    };
    for (let e of edges) {
        p[e[0]] = find(e[0]);
        p[e[1]] = find(e[1]);
        if (p[e[1]] !== e[1] && p[e[1]] !== p[e[0]]) doubleParentEdge = e; //find double parent, if we didn't add this edge, 
        //then 1. no cycle, it is good, return this edge. 
        //2. still cycle, means we should delete another edge 
        if (p[e[1]] === p[e[0]]) cycleEdge = e; 
        if (p[e[1]] === e[1]) p[e[1]] = p[e[0]]; //if no double parent and cycle, we add edge
    }
    if (cycleEdge && !doubleParentEdge) return cycleEdge;
    if (!cycleEdge && doubleParentEdge) return doubleParentEdge;
    else if (cycleEdge && doubleParentEdge){ //option 2. return another edge.
        for (let e of edges) {
            if (e[1] === doubleParentEdge[1] && e[0] !== doubleParentEdge[0]) return e; 
        }
    }
    return "no cycle, no double parents";
};



console.log(findRedundantDirectedConnection([[1,2], [1,3], [2,3]])); // [2,3]

console.log(findRedundantDirectedConnection([[1,2], [2,3], [3,4], [4,1], [1,5]])); //[4,1]


console.log(findRedundantDirectedConnection([[2,1],[3,1],[4,2],[1,4]])); //[2, 1]


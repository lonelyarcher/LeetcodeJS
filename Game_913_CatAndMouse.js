/* A game on an undirected graph is played by two players, Mouse and Cat, who alternate turns.

The graph is given as follows: graph[a] is a list of all nodes b such that ab is an edge of the graph.

Mouse starts at node 1 and goes first, Cat starts at node 2 and goes second, and there is a Hole at node 0.

During each player's turn, they must travel along one edge of the graph that meets where they are.  
For example, if the Mouse is at node 1, it must travel to any node in graph[1].

Additionally, it is not allowed for the Cat to travel to the Hole (node 0.)

Then, the game can end in 3 ways:

If ever the Cat occupies the same node as the Mouse, the Cat wins.
If ever the Mouse reaches the Hole, the Mouse wins.
If ever a position is repeated (ie. the players are in the same position as a previous turn, and it is the same player's turn to move), the game is a draw.
Given a graph, and assuming both players play optimally, return 1 if the game is won by Mouse, 2 if the game is won by Cat, and 0 if the game is a draw.

 

Example 1:

Input: [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]
Output: 0
Explanation:
4---3---1
|   |
2---5
 \ /
  0
 

Note:

3 <= graph.length <= 50
It is guaranteed that graph[1] is non-empty.
It is guaranteed that graph[2] contains a non-zero element.  */

/**
 * @param {number[][]} graph
 * @return {number}
 */
//Mouse's strategy: for all his neighbor, choose the one closest to 0 and not in the cat and cat's neighbour locations.
//Cat's strategy: choose the neighbor closest to mouse position and not 0
//calculate the dist[] to 0, and each turn calc the dist[] to mouse, 
// and record the key 50 * mouse + cat to set, if repeated in key, return 0 draw . 
// if mouse reach 0, mouse win, return 1
// if mouse can't move, all neighbor invalid, return 2, cat win
//unfortunately, the cat's strategy is wrong, first there are possible multiple same distant nodes. 
//Most important it didn't consider blocking the mouse to the hole.  


//Still need to consider dp to find recursive formula, game theory always involve the DP with MinMax
//find the minimum of cost for the worst case of  next step, your opponent(rival) use the same strategy to get the maximal gain)
//state: Node (cat_pos, mouse_pos, cat/mouse)
//(i, j , 0) mouse wins if one of neighbors can reach 0, some (nei, j, 1) === 1
//           cat wins if all of nei return 2, all (nei, j, 1) === 2
//           draw if none of neighbor wins, at least one return 0, or it repeat previous state
//(i, j , 1) cat wins if one of j's neighbors return 2
//           mouse wins if all neighbors return 1
//           draw if none return 2, at least one return 0 or repeated 
// if repeated, it will take foreever to stop, so if move 2*n step, we stop and return 0
var catMouseGame = function (graph) {
    const n = graph.length;
    const dp = [...Array(n)].map(() => [...Array(n)].map(() => Array(2).fill(undefined)));
    const rec = (i, j, w) => {
        if (i === j) return 2; //cat and mouse are in same position
        if (i === 0) return 1; //mouse reach hole
        if (dp[i][j][w] !== undefined) return dp[i][j][w];
        if (w === 0) { //mouse
            let hasDraw = false;
            for (let nei of graph[i]) {
                const res = rec(nei, j, 1);
                if (res === 1) return dp[i][j][w] = 1;
                if (res === 0) hasDraw = true;
            }
            return !hasDraw ? dp[i][j][w] = 2 : dp[i][j][w] = 0; 
        } else { //cat
            let hasDraw = false;
            for (let nei of graph[j]) {
                if (nei === 0) continue;        
                const res = rec(i, nei, 0);
                if (res === 2) return dp[i][j][w] = 2;
                if (res === 0) hasDraw = true;
            }
            return !hasDraw ? dp[i][j][w] = 1 : dp[i][j][w] = 0; 
        }
    }
    return rec(1, 2, 0);
};

//console.log(catMouseGame([[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]])); //0
//console.log(catMouseGame([[3,4],[3,5],[3,6],[0,1,2],[0,5,6],[1,4],[2,4]])); //0
console.log(catMouseGame([[6],[4],[9],[5],[1,5],[3,4,6],[0,5,10],[8,9,10],[7],[2,7],[6,7]])); //1


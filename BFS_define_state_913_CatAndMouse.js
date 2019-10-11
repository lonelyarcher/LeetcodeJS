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
//Greedy: fail
//Mouse's strategy: for all his neighbor, choose the one closest to 0 and not in the cat and cat's neighbour locations.
//Cat's strategy: choose the neighbor closest to mouse position and not 0
//calculate the dist[] to 0, and each turn calc the dist[] to mouse, 
// and record the key 50 * mouse + cat to set, if repeated in key, return 0 draw . 
// if mouse reach 0, mouse win, return 1
// if mouse can't move, all neighbor invalid, return 2, cat win
//unfortunately, the cat's strategy is wrong, first there are possible multiple same distant nodes. 
//Most important it didn't consider blocking the mouse to the hole.  


//MinMax, DFS, fail, because the draw, to enable draw happens you need to allow the repeating states.
//which cause you will infinitely loop between some states (like one deadend node) back and forth.
//So one solution is allow maximum 2N recursion and put it to the draw, but this is uncertain about it is really draw or not.

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




//BFS solution worked, time O(n^3), space O(n^2). 
//The key part is to avoiding to calculate Draw at the first place.
//it expends from all known stats, start to mark the determined state for mouse win and cat win around it.
//0. initially (0, j, m/c) = 1, (j, j, m/c) = 2, 
//1-2 immidiately win
//1. if mouse-win state in cat turn, for all neighbors of mouse_pos, mouse wins
//2. if cat-win state in mouse turn, for all neighbors of cat_pos, cat wins
//3-4 eventualy win
//3. for mouse win mouse turn, we decrease the neighbor of cat_pos in previous cat turn count, if count === 0, this previous cat state should be mouse win
//4. for cat win cat turn, we decrease the neighbor of mouse_pos in previous mouse turn count, if count === 0, this previuse mouse state should be cat win
//after determined all cat-win and mouse-win, the left states are all draw.

var catMouseGame = function (graph) {
    const n = graph.length;
    //state (mouse_pos, cat_pos, who_move) 1: mouse win 2: cat win 0: dra
    const dp = [...Array(n)].map(() => [...Array(n)].map(() => Array(2).fill(0))); 
    //num of neighbors: 
    const ns = [...Array(n)].map((c, i) => [...Array(n)].map((c, j) => [graph[i].length, graph[j].includes(0) ? graph[j].length - 1 : graph[j].length]));
    const queue = [];
    //initiate known states
    for (let j = 1; j < n; j++) {
        for (let k = 0; k < 2; k++) {
            dp[j][j][k] = 2;
            dp[0][j][k] = 1;
            queue.push([0, j, k, 1], [j, j, k, 2]);
        }
    }
    while (queue.length) {
        const [i, j, k, l] = queue.shift();
        if (dp[i][j][k] === 1 && k === 1) { //case 1, mouse win in cat turn, all previous mouse turn wins
            for (let ni of graph[i]) {
                if (dp[ni][j][0] === 0) {
                    dp[ni][j][0] = 1;
                    queue.push([ni, j, 0, 1]);
                }
            }
        } else if (dp[i][j][k] === 2 && k === 0) { //case 2, cat win in mouse turn, all previous cat turn wins
            for (let nj of graph[j]) {
                if (nj !== 0 && dp[i][nj][1] === 0) {
                    dp[i][nj][1] = 2;
                    queue.push([i, nj, 1, 2]);
                }
            }
        } else if (dp[i][j][k] === 1 && k === 0) { //case 3, mouse win in mouse turn, if previous state cat's neighbors all lose, it lose mouse win
            for (let nj of graph[j]) {
                ns[i][nj][1]--;
                if (dp[i][nj][1] === 0 && ns[i][nj][1] <= 0 && nj !== 0) {
                    dp[i][nj][1] = 1; //stupid error! previous ===
                    queue.push([i, nj, 1, 1]);
                }
            }
        }  else if (dp[i][j][k] === 2 && k === 1) { //case 4, cat win in cat turn, if previous mouse's all neighbors lost, cat win.
            for (let ni of graph[i]) {
                ns[ni][j][0]--;
                if (dp[ni][j][0] === 0 && ns[ni][j][0] <= 0) {
                    dp[ni][j][0] = 2;
                    queue.push([ni, j, 0, 2]);
                }
            }
        } 
    }
    return dp[1][2][0];
};

console.log(catMouseGame([[2,3],[3,4],[0,4],[0,1],[1,2]])); //1
console.log(catMouseGame([[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]])); //0
console.log(catMouseGame([[3,4],[3,5],[3,6],[0,1,2],[0,5,6],[1,4],[2,4]])); //0
console.log(catMouseGame([[6],[4],[9],[5],[1,5],[3,4,6],[0,5,10],[8,9,10],[7],[2,7],[6,7]])); //1


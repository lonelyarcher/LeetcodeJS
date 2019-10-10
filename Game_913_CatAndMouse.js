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

var catMouseGame = function (graph) {
    const seen = new Set();
    const bfs = node => {
        const seen = new Set([node]);
        const st = [node], dist = [];
        let d = 0;
        while (st.length) {
            const len = st.length;
            for (let i = 0; i < len; i++) {
                const cur = st.shift();
                dist[cur] = d;
                for (let ne of graph[cur]) {
                    if (!seen.has(ne)) {
                        st.push(ne);
                        seen.add(ne);
                    }
                }
            }
            d++;
        }
        return dist;
    };
    const dist0 = bfs(0);
    let cat = 2, mouse = 1;
    while (true) {
        //mouse
        const cat_pos = [cat].concat(graph[cat]);
        const mouse_ne = graph[mouse].filter(ne => !cat_pos.includes(ne));
        if (!mouse_ne) return 2;
        if (mouse_ne.includes(0)) return 1;
        mouse = mouse_ne.reduce((a, c) => dist0[c] < dist0[a] ? c : a);
        //cat
        const dist_mouse = bfs(mouse);
        cat = graph[cat].filter(ne => ne !== 0).reduce((a, c) => dist_mouse[c] < dist_mouse[a] ? c : a);
        const key = mouse * 50 + cat;
        if(seen.has(key)) return 0;
        else seen.add(key);
    }
};

console.log(catMouseGame([[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]])); //0

console.log(catMouseGame([[3,4],[3,5],[3,6],[0,1,2],[0,5,6],[1,4],[2,4]])); //0


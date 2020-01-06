/* On a 2D plane, we place stones at some integer coordinate points. 
 Each coordinate point may have at most one stone.

Now, a move consists of removing a stone that shares a column or row 
with another stone on the grid.

What is the largest possible number of moves we can make?

 

Example 1:

Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
Example 2:

Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
Example 3:

Input: stones = [[0,0]]
Output: 0
 

Note:

1 <= stones.length <= 1000
0 <= stones[i][j] < 10000 */

//Union find, O(n), because one connected component can always remove to one stone. 
//some how many connected components means how many stones left.
var removeStones = function(stones) {
    const N = stones.length;
    const p = [...Array(N)].map((c, i) => i);
    const find = i => {
        if (p[i] !== i) {
            p[i] = find(p[i]);
        }
        return p[i];
    };
    const union = (i, j) => {
        p[find(i)] = find(j);
    };
    const row = {}, col = {};
    for (let i = 0; i < stones.length; i++) { //link same row and col together
        const s = stones[i];
        if (row[s[0]]) {
            union(row[s[0]][0], i);
            row[s[0]].push(i);
        } else row[s[0]] = [i];
        if (col[s[1]]) {
            union(col[s[1]][0], i);
            col[s[1]].push(i);
        } else col[s[1]] = [i];
    }
    return N - (new Set(stones.map((_, i) => find(i))).size);//return total stones - number of connected components
};
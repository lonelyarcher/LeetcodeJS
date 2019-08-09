/* In a 1 million by 1 million grid, the coordinates of each grid square are (x, y) with 0 <= x, y < 10^6.

We start at the source square and want to reach the target square.  Each move, we can walk to a 4-directionally adjacent square in the grid that isn't in the given list of blocked squares.

Return true if and only if it is possible to reach the target square through a sequence of moves.

Note:

0 <= blocked.length <= 200
blocked[i].length == 2
0 <= blocked[i][j] < 10^6
source.length == target.length == 2
0 <= source[i][j], target[i][j] < 10^6
source != target */

/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
/* 
bfs or dfs, dfs is better, because this question is about how source could escape out of the maxium range of block.
First get maxium range of blocks, [minX, minY][maxX, maxY] 
1. both source and target are in range. do dfs in the range. 
2. both are not in the range, return true;
3. one of them is in the range, try dfs to escape out range , if success, then return true;
blocks convert into a Map use numeric as key to save space. 
*/
const hash = c => c[0]*1000000+c[1];
var isEscapePossible = function(blocked, source, target) {
    const map = blocked.reduce((a, c) => a.set(hash(c), 1), new Map());
    if (!blocked.length || (source[0] === target[0] && source[1] === target[1])) return true;
    if (map.get(hash(target)) || map.get(hash(source))) return false;
    const dir = [[1,0],[-1,0],[0,1],[0,-1]];
    let maxX = 0, maxY = 0, minX = 1000000, minY = 1000000;
    for (let [x, y] of blocked) {
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
    }
    const inside = ([x, y]) => minX < x && x < maxX && minY < y && y < maxY;
    const dfs = ([sx, sy], [tx, ty]) => {
        map.set(hash([sx, sy]), 1);
        for (let [dx, dy] of dir) {
            const [nx, ny] = [sx + dx, sy + dy];
            if (nx === tx && ny === ty) return true;
            if (nx ===)
        }
    };
    if (inside(source) && inside(target)) {
        return dfs(source, target);
    } else if (inside(target)) {
        return dfs(target, source);
    } else if (inside(source)){
        return true;
    }
};


console.log(isEscapePossible([[0,1],[1,0]], source = [0,0], target = [0,2])); //false
console.log(isEscapePossible([], source = [0,0], target = [999999,999999]));//true
console.log(isEscapePossible([[691938,300406],[710196,624190],[858790,609485],[268029,225806],[200010,188664],[132599,612099],[329444,633495],[196657,757958],[628509,883388]]
    ,[655988,180910]
    ,[267728,840949])); //true

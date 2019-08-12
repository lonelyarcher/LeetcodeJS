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
bfs or dfs, dfs is better, because this question is about how source could escape out of the range of block wall.
Total block is 200, so at most if deltaX: (new_x - original_x) + deltaY > 200, it must escape out of the walls.


1. both source and target are in the wall, so both can not be out but they can meet in well. return true
2. both can escape out, return true;
3. one in the wall, one out, they can't meet, return false 

Performance: Map with numeric keys is much faster than object with string key.

*/
const hash1 = c => c[0]*1000000+c[1];
var isEscapePossible_numeric_key = function(blocked, source, target) {
    const map = blocked.reduce((a, c) => a.set(hash1(c), 1), new Map());
    if (!blocked.length || (source[0] === target[0] && source[1] === target[1])) return true;
    if (map.get(hash1(target)) || map.get(hash1(source))) return false;
    const dir = [[1,0],[-1,0],[0,1],[0,-1]];
    
    const dfs = ([cx, cy], [sx, sy], [tx, ty], map) => { //current position, original position, target position
        map.set(hash1([cx, cy]), 1);
        for (let [dx, dy] of dir) {
            const [nx, ny] = [cx + dx, cy + dy];
            if (nx >= 0 && nx < 1000000 && ny >= 0 && ny < 1000000 && !map.has(hash1([nx, ny]))) { //check valid position
                if ( nx === tx && ny === ty) return true; //if they meet in wall
                if (Math.abs(nx - sx) + Math.abs(ny - sy) > 200) return true; //if it escape out of wall
                map.set(hash1([nx, ny]), 1);
                if (dfs([nx, ny], [sx, sy], [tx, ty], map)) return true; //if one of succeed, return true
            }
        }
        return false; //all fail, return false
    };
    return dfs(source, source, target, new Map(map)) && dfs(target, target, source, new Map(map)); //visited and block map need fresh copy.
};

const hash = c => `${c[0]}_${c[1]}`;  //timeout in large scale test
var isEscapePossible_string_key = function(blocked, source, target) {
    const map = blocked.reduce((a, c) => {a[hash(c)] = 1; return a}, {});
    if (!blocked.length || (source[0] === target[0] && source[1] === target[1])) return true;
    if (map[hash(target)] || map[hash(source)]) return false;
    const dir = [[1,0],[-1,0],[0,1],[0,-1]];
    
    const dfs = ([cx, cy], [sx, sy], [tx, ty], map) => { //current position, original position, target position
        map[hash([cx, cy])] = 1;
        for (let [dx, dy] of dir) {
            const [nx, ny] = [cx + dx, cy + dy];
            if (nx >= 0 && nx < 1000000 && ny >= 0 && ny < 1000000 && !map[hash([nx, ny])]) { //check valid position
                if ( nx === tx && ny === ty) return true; //if they meet in wall
                if (Math.abs(nx - sx) + Math.abs(ny - sy) > 200) return true; //if it escape out of wall
                map[hash([nx, ny])] = 1;
                if (dfs([nx, ny], [sx, sy], [tx, ty], map)) return true; //if one of succeed, return true
            }
        }
        return false; //all fail, return false
    };
    return dfs(source, source, target, {...map}) && dfs(target, target, source, {...map}); //visited and block map need fresh copy.
};


console.log(isEscapePossible_numeric_key([[0,1],[1,0]], source = [0,0], target = [0,2])); //false
console.log(isEscapePossible_numeric_key([], source = [0,0], target = [999999,999999]));//true
console.log(isEscapePossible_numeric_key([[691938,300406],[710196,624190],[858790,609485],[268029,225806],[200010,188664],[132599,612099],[329444,633495],[196657,757958],[628509,883388]]
    ,[655988,180910]
    ,[267728,840949])); //true

console.log(isEscapePossible_numeric_key([[0,3],[1,0],[1,1],[1,2],[1,3]], [0,0], [0,2])); //true

/* Given a set of points in the xy-plane, determine the minimum area of a rectangle formed from these points, with sides parallel to the x and y axes.

If there isn't any rectangle, return 0.

 

Example 1:

Input: [[1,1],[1,3],[3,1],[3,3],[2,2]]
Output: 4
Example 2:

Input: [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]
Output: 2
 

Note:

1 <= points.length <= 500
0 <= points[i][0] <= 40000
0 <= points[i][1] <= 40000
All points are distinct. */

/**
 * @param {number[][]} points
 * @return {number}
 */
//find each pair of diagonal and check another two points are in the list or not
//O(n^2)
var minAreaRect = function(points) {
    let minArea = Infinity;
    const set = points.reduce((a, c) => {a.add(c[0]*40001+c[1]); return a;}, new Set());
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const [x1, y1] = points[i];
            const [x3, y3] = points[j];
            if (x1 !== x3 && y1 !== y3) {
                const [x2, y2] = [x3, y1];
                const [x4, y4] = [x1, y3];
                if (set.has(x2*40001 + y2) && set.has(x4*40001 + y4)) {
                    minArea = Math.min(minArea, Math.abs((x2 - x1) * (y1 - y4)));
                }
            }
        }
    }
    return minArea === Infinity ? 0 : minArea;
};
console.log(minAreaRect([[1,1],[1,3],[3,1],[3,3],[2,2]])); //4
console.log(minAreaRect([[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]])); //2


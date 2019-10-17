//Vector, python complex, other language pair [x, y]
//parallelogram forth point:
const p4 = (p1, p2, p3) => (p2 + p3) - p1;
//two lines (four points, p1 -> p2, p3 -> p4) perpendicular (vertical), dot product
const isPerpendicular =  (p1, p2, p3, p4) => (p1[0] - p2[0]) * (p3[0] - p4[0]) + (p1[1] - p2[1]) * (p3[1] - p4[1]) === 0 


/* Given a set of points in the xy-plane, determine the minimum area of any rectangle formed from these points, with sides not necessarily parallel to the x and y axes.

If there isn't any rectangle, return 0.

 

Example 1:



Input: [[1,2],[2,1],[1,0],[0,1]]
Output: 2.00000
Explanation: The minimum area rectangle occurs at [1,2],[2,1],[1,0],[0,1], with an area of 2.
Example 2:



Input: [[0,1],[2,1],[1,1],[1,0],[2,0]]
Output: 1.00000
Explanation: The minimum area rectangle occurs at [1,0],[1,1],[2,1],[2,0], with an area of 1.
Example 3:



Input: [[0,3],[1,2],[3,1],[1,3],[2,1]]
Output: 0
Explanation: There is no possible rectangle to form from these points.
Example 4:



Input: [[3,1],[1,1],[0,1],[2,1],[3,3],[3,2],[0,2],[2,3]]
Output: 2.00000
Explanation: The minimum area rectangle occurs at [2,1],[2,3],[3,3],[3,1], with an area of 2.
 

Note:

1 <= points.length <= 50
0 <= points[i][0] <= 40000
0 <= points[i][1] <= 40000
All points are distinct.
Answers within 10^-5 of the actual value will be accepted as correct. */

/**
 * @param {number[][]} points
 * @return {number}

every comination of two points, calculate mid_point, dist of them.
if two diagonals has same length and there middle points coincide at the same position, those two diagonals must form a rectangle.
keys: mid_point hash (40000*i + j)*40000 + dist, save it into map [p1, p2]
go inside each value of list, get combination of two records, calculate area

 */
const dist = (p1, p2) => (p1[0] - p2[0])**2 + (p1[1] - p2[1])**2;
const m = 10**9 + 7;
var minAreaFreeRect = function(points) {
    const map = {}, n = points.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const [mid_i, mid_j] = [(points[i][0] + points[j][0]) / 2, (points[i][1] + points[j][1]) / 2];
            const d = dist(points[i], points[j]);
            const key = ((((mid_i * 40000 + mid_j) % m) * 40000) % m + d) % m;
            map[key] = map[key] || [];
            map[key].push([points[i], points[j]]);
        }
    }
    let min = Infinity;
    Object.values(map).forEach(list => {
        for (let i = 0; i < list.length; i++) {
            for (let j = i + 1; j < list.length; j++) {
                const area = Math.sqrt(dist(list[i][0], list[j][0]) * dist(list[i][0], list[j][1]));
                min = Math.min(area, min);
            }
        }
    });
    return min === Infinity ? 0 : min;
};

console.log(minAreaFreeRect([[1,2],[2,1],[1,0],[0,1]])); //2
console.log(minAreaFreeRect([[0,1],[2,1],[1,1],[1,0],[2,0]])); //1
console.log(minAreaFreeRect([[0,3],[1,2],[3,1],[1,3],[2,1]])); //0
console.log(minAreaFreeRect([[3,1],[1,1],[0,1],[2,1],[3,3],[3,2],[0,2],[2,3]])); // 2
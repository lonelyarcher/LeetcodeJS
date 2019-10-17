/* We have a list of points on the plane.  Find the K closest points to the origin (0, 0).

(Here, the distance between two points on a plane is the Euclidean distance.)

You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)

 

Example 1:

Input: points = [[1,3],[-2,2]], K = 1
Output: [[-2,2]]
Explanation: 
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], K = 2
Output: [[3,3],[-2,4]]
(The answer [[-2,4],[3,3]] would also be accepted.)
 

Note:

1 <= K <= points.length <= 10000
-10000 < points[i][0] < 10000
-10000 < points[i][1] < 10000 */

/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function(points, K) {
    const dist = p => p[0] * p[0] + p[1] * p[1];
    const swap = (l, r) => {
        const tmp = points[l];
        points[l] = points[r];
        points[r] = tmp;
    };

    /* partition: 
    1. set pivot = arr[r]
    2. set smaller front i = l - 1
    3. loop point j from l to r - 1
    4. if arr[j] < pivot, swap(++i, j)
    5. end loop, swap r and i + 1
    6. return i + 1, all the number before it < pivot
    */
    const partition = (l, r) => {
        const pivot = points[r];
        let i = l - 1;
        for (let j = l; j < r; j++) {
            if (dist(points[j]) < dist(pivot)) {
                swap(++i, j);
            }
        }
        swap(r, i + 1);
        return i + 1;
    };
    let l = 0, r = points.length - 1;
    while(true) {
        const s = partition(l, r);
        if (s === K - 1) {
            return points.slice(0, K);
        } else if (s < K) {
            l = s + 1;
        } else {
            r = s - 1;
        }
    }
};

console.log(kClosest([[0,1],[1,0]], 2).join());//[0,1],[1,0]
console.log(kClosest(points = [[1,3],[-2,2]], K = 1).join());//Output: [[-2,2]]
console.log(kClosest([[3,3],[5,-1],[-2,4]], K = 2).join());//[[3,3],[-2,4]]

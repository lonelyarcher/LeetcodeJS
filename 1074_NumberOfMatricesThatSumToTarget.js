/* 1074. Number of Submatrices That Sum to Target
Hard

113

4

Favorite

Share
Given a matrix, and a target, return the number of non-empty submatrices that sum to target.

A submatrix x1, y1, x2, y2 is the set of all cells matrix[x][y] with x1 <= x <= x2 and y1 <= y <= y2.

Two submatrices (x1, y1, x2, y2) and (x1', y1', x2', y2') are different if they have some coordinate that is different: for example, if x1 != x1'.

 

Example 1:

Input: matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
Output: 4
Explanation: The four 1x1 submatrices that only contain 0.
Example 2:

Input: matrix = [[1,-1],[-1,1]], target = 0
Output: 5
Explanation: The two 1x2 submatrices, plus the two 2x1 submatrices, plus the 2x2 submatrix.
 

Note:

1 <= matrix.length <= 300   //O(n^2)
1 <= matrix[0].length <= 300
-1000 <= matrix[i] <= 1000
-10^8 <= target <= 10^8 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function(matrix, target) {
    if (matrix.length === 0 || matrix[0].length === 0) return target === 0 ? 1 : 0;
    const m = matrix.length, n = matrix[0].length;
    const s = [...Array(m + 1)].map(r => Array(n + 1).fill(0));
    let count = 0;
    for (let i2 = 1; i2 <= m; i2++) {
        for (let j2 = 1; j2 <= n; j2++) {
            s[i2][j2] = s[i2 - 1][j2] + s[i2][j2 - 1] - s[i2 - 1][j2 - 1] + (matrix[i2 - 1][j2 - 1] || 0);
            for (let i1 = 0; i1 < i2; i1++) {
                for (let j1 = 0; j1 < j2; j1++) {
                    if (s[i2][j2] - s[i1][j2] - s[i2][j1] + s[i1][j1] === target) count++
                }
            }
        }
    }
    return count;
};

console.log(numSubmatrixSumTarget(matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0));//4
console.log(numSubmatrixSumTarget([[1,-1],[-1,1]], target = 0));//5

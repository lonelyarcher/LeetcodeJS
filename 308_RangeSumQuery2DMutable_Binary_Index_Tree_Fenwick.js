/* Given a 2D matrix matrix, find the sum of the elements inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

Range Sum Query 2D
The above rectangle (with the red border) is defined by (row1, col1) = (2, 1) and (row2, col2) = (4, 3), which contains sum = 8.


Note:
The matrix is only modifiable by the update function.
You may assume the number of calls to update and sumRegion function is distributed evenly.
You may assume that row1 ≤ row2 and col1 ≤ col2. */

/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
    this.m = matrix.length;
    this.n = (matrix[0] || []).length;
    this.matrix = matrix;
    this.bit = [...Array(this.m + 1)].map(() => Array(this.n + 1).fill(0));
    for (let i = 0; i < this.m; i++) {
        for (let j = 0; j < this.n; j++) {
            this.updateBit(i + 1, j + 1, matrix[i][j]);
        }
    }
    console.log(this.bit.map(r => r.join()).join('\n'));
};

/** 
 * @param {number} row 
 * @param {number} col 
 * @param {number} val
 * @return {void}
 */
NumMatrix.prototype.update = function(row, col, val) {
    const delta = val - this.matrix[row][col];
    this.updateBit(row + 1, col + 1, delta); //bit array index is one larger than original array
};

NumMatrix.prototype.updateBit = function(i, j, delta) {
    while (i <= this.m) {
        let nj = j;
        while (nj <= this.n) {
            this.bit[i][nj] += delta;
            nj += (nj & -nj);    
        }
        i += (i & -i); //lowbit
    }
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    return this.query(row2 + 1, col2 + 1)  //need increase by one to bit array
    - this.query(row1, col2 + 1) - this.query(row2 + 1, col1) 
    + this.query(row1, col1); //the right upper need minus -, and it offset the increasement
};

NumMatrix.prototype.query = function(i, j) {
    let ans = 0;
    while (i > 0) {
        let nj = j; //new line, need reset nj back the j position
        while (nj > 0) {
            ans += this.bit[i][nj];
            nj -= (nj & -nj);
        }
        i -= (i & -i);
    }
    return ans;
};


const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
];

var obj = new NumMatrix(matrix);
console.log(obj.sumRegion(2, 1, 4, 3)); // 8
obj.update(3, 2, 2);
console.log(obj.sumRegion(2, 1, 4, 3)); //10

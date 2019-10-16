/* Consider a matrix M with dimensions width * height, such that every cell has value 0 or 1, and any square sub-matrix of M of size sideLength * sideLength has at most maxOnes ones.

Return the maximum possible number of ones that the matrix M can have.

 

Example 1:

Input: width = 3, height = 3, sideLength = 2, maxOnes = 1
Output: 4
Explanation:
In a 3*3 matrix, no 2*2 sub-matrix can have more than 1 one.
The best solution that has 4 ones is:
[1,0,1]
[0,0,0]
[1,0,1]
Example 2:

Input: width = 3, height = 3, sideLength = 2, maxOnes = 2
Output: 6
Explanation:
[1,0,1]
[1,0,1]
[1,0,1]
 

Constraints:

1 <= width, height <= 100
1 <= sideLength <= width, height
0 <= maxOnes <= sideLength * sideLength */

/**
 * @param {number} width
 * @param {number} height
 * @param {number} sideLength
 * @param {number} maxOnes
 * @return {number}
 */

//Greedy, you can image you are stamping square in the matrix, 
//some cell if i < wide % sideLength will repeat 1 + wide/sideLength time, other only wide/sublength in horizontal
//same as vertical direction, total occurcane = occu_wide * occu_height for each cell in each square
//as greedy as possible, you will first use those max occurance cell to put one into it.
//so you can sort this array, take first maxOne part and sum it to be the answer. 
var maximumNumberOfOnes = function(width, height, sideLength, maxOnes) {
    const occu = []; //occu array for all the cell in each square
    for (let i = 0; i < sideLength; i++) {
        for (let j = 0; j < sideLength; j++) {
            const occuW = ~~(width/sideLength) + (i < (width % sideLength) ? 1 : 0); //horizontal occurance
            const occuH = ~~(height/sideLength) + (j < (height % sideLength) ? 1 : 0); //vertical occurance
            occu.push(occuH * occuW);
        }
    }
    return occu.sort((a, b) => b - a).slice(0, maxOnes).reduce((a, c) => a + c, 0); //sort, take first maxOne numbers, and take sum of them
};

console.log(maximumNumberOfOnes(width = 3, height = 3, sideLength = 2, maxOnes = 1)); //4
console.log(maximumNumberOfOnes(width = 3, height = 3, sideLength = 2, maxOnes = 2)); //6
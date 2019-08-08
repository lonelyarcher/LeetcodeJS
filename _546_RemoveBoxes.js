/* Given several boxes with different colors represented by different positive numbers. 
You may experience several rounds to remove boxes until there is no box left. 
Each time you can choose some continuous boxes with the same color (composed of k boxes, k >= 1), remove them and get k*k points.
Find the maximum points you can get.

Example 1:
Input:

[1, 3, 2, 2, 2, 3, 4, 3, 1]
Output:
23
Explanation:
[1, 3, 2, 2, 2, 3, 4, 3, 1] 
----> [1, 3, 3, 4, 3, 1] (3*3=9 points) 
----> [1, 3, 3, 3, 1] (1*1=1 points) 
----> [1, 1] (3*3=9 points) 
----> [] (2*2=4 points)
Note: The number of boxes n would not exceed 100. */

// dp, upgrade dimension, dp[i][j] from i to j, upgrade to 3 dimension, dp[i][j][k] from i to j, the last one is color x, k is how many same color x box after j. 
// The last one in j is very important, it help to divided to sub question by remove it. so the third dimension most likely is about the last element j
// memorization search vs dp, if key is very sparse, better use memorization search. 
// use compositive key , dp[i][j][k] => key i*10000 + j*100 + k if i,j,k < 100, 3 dimension downgrade to 1 dimension.

/**
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function(boxes) {
    
};

console.log(removeBoxes([1, 3, 2, 2, 2, 3, 4, 3, 1])); //Output: 23
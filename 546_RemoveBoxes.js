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

// dp, upgrade dimension, dp[i][j] from i to j, upgrade to 3 dimension, 
// the reason to upgrade: the problem in [i to j] is not isolated, it also depends on the boxes which immediately after j, if the boxed after j has the same color. 
// it will be removed with the j. then j can't be removed without its right neighbour. To solve it, we add the number of the same color after j to be the third dimension.
// so even we can't isolated solve the [i to j], but we can include the same color box after j so we can solve [i to j] and k: the number of same color boxes immediately and continuously after j. 
// k is how many same color x box continuously after j. box[i].....box[j,R], R, R, R so k = 3. 3 R is immediately after box j which color is R 
// The last one in j is very important, it help to divided to sub question by remove it. so the third dimension most likely is about the last element j
// memorization search vs dp, if key is very sparse, better use memorization search. 
// use compositive key , dp[i][j][k] => key i*10000 + j*100 + k if i,j,k < 100, 3 dimension downgrade to 1 dimension.

/**
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes_dp = function(boxes) {
    const n = boxes.length;
    const memo = [...Array(n)].map(() => [...Array(n)].map(() => Array(n).fill(0)));
    const subFunc = (i, j, k) => {
        if (i > j) return 0;
        if (memo[i][j][k]) return memo[i][j][k];
        while (boxes[j] === boxes[j - 1] && j > i) {
            j--;
            k++;
        }
        
        memo[i][j][k] = subFunc(i, j - 1, 0) + (k + 1) * (k + 1);
        for (let l = i; l < j; l++) {
            if (boxes[l] === boxes[j]) {
                memo[i][j][k] = Math.max(memo[i][j][k], subFunc(i, l, k + 1) + subFunc(l + 1, j - 1, 0)); //mistake, j need minus one, because j is attach to the [i][l][k + 1] part
            }
        }
        return memo[i][j][k];
    }
    return subFunc(0, n - 1, 0);
};

//dfs, brute force, Time: O(n!)
var removeBoxes = function(boxes) {
    const n = boxes.length;
    let i = 0, ans = 0;
    if (n === 0) return 0; //dfs recursion, don't forget the end condition.
    while(i < n) {
        let j = i + 1;
        while (j < n && boxes[j] === boxes[i]) j++;
        ans = Math.max(ans, (j - i)*(j - i) + removeBoxes(boxes.slice(0, i).concat(boxes.slice(j)))); 
        //mistake: join array should be concat, slice if begin >= length, then return empty []
        i++; //mistake, don't forget increase the variable in while loop
    }
    return ans;
};

console.log(removeBoxes([1])); //Output: 1
console.log(removeBoxes([1, 3, 2, 2, 2, 3, 4, 3, 1])); //Output: 23
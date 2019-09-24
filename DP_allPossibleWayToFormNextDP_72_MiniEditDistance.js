/* Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.

You have the following 3 operations permitted on a word:

Insert a character
Delete a character
Replace a character
Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u') */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
//DP, the subproblem must be from one of operation, list all possible ways and take the minimum is the answer.
var minDistance = function(word1, word2) {
    const m = word1.length, n = word2.length;
    const mem = [...Array(m + 1)].map(() => Array(n + 1).fill(undefined));
    const sub = (i, j) => {
        if (i === 0) return j;
        if (j === 0) return i;
        if (mem[i][j] !== undefined) return mem[i][j];
        mem[i][j] = Math.min(
            1 + sub(i, j - 1), 
            1 + sub(i - 1, j), 
            word1.charAt(i - 1) === word2.charAt(j - 1) ? sub(i - 1, j - 1) : 1 + sub(i - 1, j - 1)
        );
        return mem[i][j];
    }
    return sub(m, n);
};

console.log(minDistance(word1 = "horse", word2 = "ros")); //3
console.log(minDistance(word1 = "intention", word2 = "execution")); //5

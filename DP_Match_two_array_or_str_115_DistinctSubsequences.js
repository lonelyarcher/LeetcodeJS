/* Given a string S and a string T, count the number of distinct subsequences of S which equals T.

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).

Example 1:

Input: S = "rabbbit", T = "rabbit"
Output: 3
Explanation:

As shown below, there are 3 ways you can generate "rabbit" from S.
(The caret symbol ^ means the chosen letters)

rabbbit
^^^^ ^^
rabbbit
^^ ^^^^
rabbbit
^^^ ^^^
Example 2:

Input: S = "babgbag", T = "bag"
Output: 5
Explanation:

As shown below, there are 5 ways you can generate "bag" from S.
(The caret symbol ^ means the chosen letters)

babgbag
^^ ^
babgbag
^^    ^
babgbag
^    ^^
babgbag
  ^  ^^
babgbag
    ^^^ */

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */

//DP, that last step can always give you clue:
// if last char of s is different than t's , then this last s is userless.
//DP we usually take len i and len j as array/string length, so begin is empty arr/str
//dp[i][j] = d[i - 1][j] if charAt[i - 1] !== charAt[j - 1]
//then is they are same, then we have two choices, one take it as a end match (i) or not (ii).
//option i: dp[i][j] will include all the dp[i - 1][j - 1]
//option ii: if we don't take, same as not equal condition, we will have dp[i - 1][j]
//so we get the sub equation: dp[i][j] = charAt[i - 1] === charAt[j - 1] ? dp[i - 1][j - 1] + dp[i - 1][j] : dp[i - 1][j]
//then the initial dp[0][0] = 1, empty string match empty string, or you can use sub equation to get it: 'a' : 'a' = 1 = ('':'') + ('', 'a'), so '' : '' = 1
//then we can use bottom up, from (0,0) => (0, j) => (i, 0) => (i, j) 
//bottom up have two ways, one from a matrix, (0,0) first row and first column, then to all others
//another, begin with all length === 1, pairs of i,j, then length increase to 2, 3, ..., n;

var numDistinct = function(s, t) {
    const dp = [...Array(s.length + 1)].map(() => Array(t.length).fill(0));
    dp[0][0] = 1;
    for (let i = 1; i <= s.length; i++) dp[i][0] = 1;
    for (let j = 1; j <= t.length; j++) dp[0][j] = 0;
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= t.length; j++) {
            dp[i][j] = s.charAt(i - 1) === t.charAt(j - 1) ? dp[i - 1][j - 1] + dp[i - 1][j] : dp[i - 1][j];
        }
    }
    return dp[s.length][t.length];
};

console.log(numDistinct(S = "rabbbit", T = "rabbit")); //3
console.log(numDistinct(S = "babgbag", T = "bag")); //5
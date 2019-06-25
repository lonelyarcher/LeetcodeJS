/**
 * Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences.  If multiple answers exist, you may return any of them.

(A string S is a subsequence of string T if deleting some number of characters from T (possibly 0, and the characters are chosen anywhere from T) results in the string S.)

 

Example 1:

Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: 
str1 = "abac" is a substring of "cabac" because we can delete the first "c".
str2 = "cab" is a substring of "cabac" because we can delete the last "ac".
The answer provided is the shortest such string that satisfies these properties.
 

Note:

1 <= str1.length, str2.length <= 1000
str1 and str2 consist of lowercase English letters.
 * 
 */

 /**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function(str1, str2) {
    //dynamic programming
    console.info(Array(str1.length + 1).fill());
    const dp = Array(str1.length + 1).fill().map(r => Array(str2.length + 1).fill());
    //const dp = Array.from({length: str1.length + 1}, x => Array(str2.length + 1).fill(0));
    
    const helper = (i, j) => {
        if (dp[i][j]) return dp[i][j];
        if (i == 0) return str2.slice(0, j);
        if (j == 0) return str1.slice(0, i);
        if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
            dp[i][j] = helper(i - 1, j - 1) + str1.charAt(i - 1);    
        } else {
            const s1 = helper(i - 1, j) + str1.charAt(i - 1);
            const s2 = helper(i, j - 1) + str2.charAt(j - 1);
            dp[i][j] = s1.length >= s2.length ? s2 : s1;
        }
        return dp[i][j];
    };
    
    return helper(str1.length, str2.length);
    
};

console.info(shortestCommonSupersequence("abac","cab"));

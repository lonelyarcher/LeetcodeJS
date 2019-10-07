/*  Given a string s and an integer k, find out if the given string is a K-Palindrome or not.

A string is K-Palindrome if it can be transformed into a palindrome by removing at most k characters from it.

 

Example 1:

Input: s = "abcdeca", k = 2
Output: true
Explanation: Remove 'b' and 'e' characters.
 

Constraints:

1 <= s.length <= 1000
s has only lowercase English letters.
1 <= k <= s.length*/

var isValidPalindrome = function(s, k) {
    //longest subsequence palindrome
    
    const n = s.length;
    const dp = [...Array(n)].map(() => Array(n).fill(undefined));
    const helper = (i, j) => {
        if (i > j) return 0;
        if (i === j) return 1;
        if (dp[i][j] !== undefined) return dp[i][j];
        dp[i][j] = s.charAt(i) !== s.charAt(j) ? Math.max(helper(i + 1, j), helper(i, j - 1)) : 2 + helper(i + 1, j - 1);
        return dp[i][j];
    };
    const lsp = helper(0, n - 1);
    return n - lsp <= k;
};
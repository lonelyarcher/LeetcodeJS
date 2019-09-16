/* Given an input string (s) and a pattern (p),
 implement regular expression matching with support for '.' and '*'.

'.' Matches any single character.
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

Note:

s could be empty and contains only lowercase letters a-z.
p could be empty and contains only lowercase letters a-z, and characters like . or *.

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
//DP by match two string, backward match from i, j to find out sub equation.
//only tricky part is to handle *, when char before * not match s, you can only skip two chars 'x*'
//when matching, you can match it, but just kick out the s and keep the pattern *, because it always can be skipped when not matching.
//This is so called, greedy matching, * try to match as many as it can. 
var isMatch = function(s, p) {
    const dp = [...Array(s.length + 1)].map(() => Array(p.length + 1).fill(undefined));
    dp[0][0] = true;
    for (let i = 1; i <= s.length; i++) dp[i][0] = false;
    for (let j = 1; j <= p.length; j++) dp[0][j] = p.charAt(j - 1) === '*' ? dp[0][j - 2] : false;
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= p.length; j++) {
            if (s.charAt(i - 1) === p.charAt(j - 1) || p.charAt(j - 1) === '.') dp[i][j] = dp[i - 1][j - 1];
            else if (p.charAt(j - 1) === '*') dp[i][j] = (s.charAt(i - 1) === p.charAt(j - 2) || p.charAt(j - 2) === '.') ? (dp[i - 1][j] || dp[i][j - 2]) : dp[i][j - 2];
            else dp[i][j] = false; 
        }
    }
    return dp[s.length][p.length];
};

console.log(isMatch("aaaa", "aa*")); //true
console.log(isMatch("aa", "a")); //false
console.log(isMatch("aa", ".*")); //true
console.log(isMatch("cab", "c*a*b")); //true
console.log(isMatch("mississippi", "mis*is*p*."));//false
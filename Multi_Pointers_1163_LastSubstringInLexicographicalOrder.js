/* Given a string s, return the last substring of s in lexicographical order.

Note:

1 <= s.length <= 4 * 10^5
s contains only lowercase English letters. */

/**
 * @param {string} s
 * @return {string}
 */
var lastSubstring = function(s) {
    let i = 0, ci = s.charAt(0), pi = 0, k, j = 0;
    for (let j = 1; j < s.length; j++) {
        const c = s.charAt(j);
        if (c > ci) {
            i = pi = j;
            ci = c;
            k = undefined;
        } else if (k && s.charAt(pi) < c) {
            i 
        } else {

        }
    }
    return last;
};
 


console.log(lastSubstring("abab")); //"bab"
//Explanation: The substrings are ["a", "ab", "aba", "abab", "b", "ba", "bab"]. The lexicographically maximum substring is "bab".

console.log(lastSubstring("leetcode")); // "tcode"
 



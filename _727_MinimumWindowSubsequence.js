/* Given strings S and T, find the minimum (contiguous) substring W of S, so that T is a subsequence of W.

If there is no such window in S that covers all characters in T, return the empty string "". If there are multiple such minimum-length windows, return the one with the left-most starting index.

Example 1:

Input: 
S = "abcdebdde", T = "bde"
Output: "bcde"
Explanation: 
"bcde" is the answer because it occurs before "bdde" which has the same length.
"deb" is not a smaller window because the elements of T in the window must occur in order.
 

Note:

All the strings in the input will only contain lowercase letters.
The length of S will be in the range [1, 20000].
The length of T will be in the range [1, 100]. */

/**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */
//DP: the largest index of start of substring [ss, se] to cover subsequence t = dp(se, te)
//dp(se, te) = dp(se - 1, te) or dp(se - 1, te - 1) if s.charAt(se) === t.charAt(te)  

var minWindow = function(S, T) {
    
};
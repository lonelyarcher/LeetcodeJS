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
//DP: the largest idx of start of substring ends at sEnd to cover subsequence t ends at tEnd = dp(tEnd, Send)
//Recursive Formula: dp(tEnd, sEnd) = min (dp(tEnd, sEnd - 1) or dp(tEnd - 1, sEnd - 1) if s.charAt(sEnd) === t.charAt(tEnd))  

var minWindow = function(S, T) {
    const dp = [...Array(T.length + 1)].map(() => Array(S.length + 1).fill(undefined));
    const recFunc = (t, s) => {
        if (t === 0) return s;
        if (s === 0) return -Infinity;
        if (dp[t][s] !== undefined) return dp[t][s];
        dp[t][s] = recFunc(t, s - 1);
        if (S.charAt(s - 1) === T.charAt(t - 1)) {
            dp[t][s] = Math.max(dp[t][s], recFunc(t - 1, s - 1));
        }
        return dp[t][s];
    };
    recFunc(T.length, S.length);
    let minLen = Infinity;
    return dp[T.length].reduce((a, c, i) => {
        if (c !== undefined && i - c  < minLen) {
            minLen = i - c;
            a = S.slice(c, i);
        }
        return a;
    }, '');
};

console.log(minWindow(S = "abcdebdde", T = "bde")); //bcde
console.log(minWindow("fgrqsqsnodwmxzkzxwqegkndaa", "fnok")); //"fgrqsqsnodwmxzk"
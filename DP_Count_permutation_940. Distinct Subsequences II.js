/* Given a string S, count the number of distinct, non-empty subsequences of S .

Since the result may be large, return the answer modulo 10^9 + 7.


Note:

S contains only lowercase letters.
1 <= S.length <= 2000 */

/**
 * @param {string} S
 * @return {number}
 */
//2D: first i and ends at character j
var distinctSubseqII = function(S) {
    const m = 10**9+7;
    const code = i => S.charCodeAt(i) - 'a'.charCodeAt(0);
    const dp = [...Array(S.length)].map(() => Array(26).fill(0));
    dp[0][code(0)] = 1; //first char, only 1
    for (let i = 1; i < S.length; i++) {
        const cur = code(i);
        dp[i][cur] = 1;//the single cur char as subseq
        for (let j = 0; j < 26; j++) {
            dp[i][cur] = (dp[i][cur] + dp[i - 1][j]) % m; //every previous add new cur char, after that we actually take all the dp[i-1][cur] out
            if (j !== cur) {
                dp[i][j] = dp[i - 1][j]; //move all other over
            }
        }
    }
    return dp[S.length - 1].reduce((a, c) => (a + c) % m);
};

//one D, dp[i] = 2*dp[i - 1] - dp[last index of cur char - 1] - 1;
var distinctSubseqII_1 = function(S) {
    const m = 10**9+7;
    const dp = Array(S.length + 1).fill(0);
    dp[0] = 1; //[''];
    const last = {};
    for (let i = 1; i <= S.length; i++) {
        const cur = S.charAt(i - 1);
        dp[i] = (2 * dp[i - 1] - (last[cur] !== undefined ? dp[last[cur] - 1] : 0) + m) % m;
        last[cur] = i;
    }
    return dp[S.length] - 1;
};

console.log(distinctSubseqII_1("abc")); //7 "a", "b", "c", "ab", "ac", "bc", and "abc".
console.log(distinctSubseqII_1("aba")); //6 "a", "b", "ab", "ba", "aa" and "aba".
console.log(distinctSubseqII_1("aaa")); //3 "a", "aa" and "aaa".
console.log(distinctSubseqII_1("abab")); //11

console.log(distinctSubseqII("abc")); //7 "a", "b", "c", "ab", "ac", "bc", and "abc".
console.log(distinctSubseqII("aba")); //6 "a", "b", "ab", "ba", "aa" and "aba".
console.log(distinctSubseqII("aaa")); //3 "a", "aa" and "aaa".
console.log(distinctSubseqII("abab")); //11


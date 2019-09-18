/* Given a string S, find the number of different non-empty palindromic subsequences in S, and return that number modulo 10^9 + 7.

A subsequence of a string S is obtained by deleting 0 or more characters from S.

A sequence is palindromic if it is equal to the sequence reversed.

Two sequences A_1, A_2, ... and B_1, B_2, ... are different if there is some i for which A_i != B_i.

Example 1:
Input: 
S = 'bccb'
Output: 6
Explanation: 
The 6 different non-empty palindromic subsequences are 'b', 'c', 'bb', 'cc', 'bcb', 'bccb'.
Note that 'bcb' is counted only once, even though it occurs twice.
Example 2:
Input: 
S = 'abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba'
Output: 104860361
Explanation: 
There are 3104860382 different non-empty palindromic subsequences, which is 104860361 modulo 10^9 + 7.
Note:

The length of S will be in the range [1, 1000].
Each character S[i] will be in the set {'a', 'b', 'c', 'd'}. */

/**
 * @param {string} S
 * @return {number}
 */
var countPalindromicSubsequences = function(S) {
    const m = [...Array(S.length)].map(() => Array(S.length).fill(undefined));
    const mod = 10**9 + 7;
    const sub = (i, j) => {
        if (i === j) return 1;
        if (i > j) return 0;
        if (m[i][j] !== undefined) return m[i][j];
        if (S.charAt(i) !== S.charAt(j)) {
            m[i][j] = sub(i + 1, j) + sub(i, j - 1) - sub(i + 1, j - 1); 
            //error, if take mod, sometime it will became negative
        } else {
            //find out inside i, j whether there are other repeated char as i and j
            let p = i + 1, q = j - 1;
            while (p <= q && S.charAt(p) !== S.charAt(i)) p++;
            while (p <= q && S.charAt(q) !== S.charAt(i)) q--;
            if (p > q) { //no repeat 
                m[i][j] = 2 + 2 * sub(i + 1, j - 1);
            } 
            else if (p === q) { //1 repeat
                m[i][j] = 1 + 2 * sub(i + 1, j - 1);
            } else { // 2+ repeat
                m[i][j] = 2 * sub(i + 1, j - 1) - sub(p + 1, q - 1); //hardest part, please use 'aaxaa' to calculate
            }  
        };
        m[i][j] = (m[i][j] < 0 ? m[i][j] + mod : m[i][j]) % mod;
        return m[i][j];
    };
    return sub(0, S.length - 1); 
};

console.log(countPalindromicSubsequences('bccb'));//6
console.log(countPalindromicSubsequences('aaxaa'));//5
console.log(countPalindromicSubsequences('abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba'));//104860361
console.log(countPalindromicSubsequences("bcbacbabdcbcbdcbddcaaccdcbbcdbcabbcdddadaadddbdbbbdacbabaabdddcaccccdccdbabcddbdcccabccbbcdbcdbdaada"));//117990582
console.log(countPalindromicSubsequences("bddaabdbbccdcdcbbdbddccbaaccabbcacbadbdadbccddccdbdbdbdabdbddcccadddaaddbcbcbabdcaccaacabdbdaccbaacc")); //744991227
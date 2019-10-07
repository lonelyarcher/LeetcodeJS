/* Given an integer n, your task is to count how many strings of length n can be formed under the following rules:

Each character is a lower case vowel ('a', 'e', 'i', 'o', 'u')
Each vowel 'a' may only be followed by an 'e'.
Each vowel 'e' may only be followed by an 'a' or an 'i'.
Each vowel 'i' may not be followed by another 'i'.
Each vowel 'o' may only be followed by an 'i' or a 'u'.
Each vowel 'u' may only be followed by an 'a'.
Since the answer may be too large, return it modulo 10^9 + 7.

 

Example 1:

Input: n = 1
Output: 5
Explanation: All possible strings are: "a", "e", "i" , "o" and "u".
Example 2:

Input: n = 2
Output: 10
Explanation: All possible strings are: "ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" and "ua".
Example 3: 

Input: n = 5
Output: 68
 

Constraints:

1 <= n <= 2 * 10^4 */

var countVowelPermutation = function(n) {
    const a = [1], e = [1], i = [1], o = [1], u = [1], m = 10 ** 9 + 7;
    for (let j = 1; j < n; j++) {
        a[j] = (u[j - 1] + i[j - 1] + e[j - 1]) % m;
        e[j] = (a[j - 1] + i[j - 1]) % m;
        i[j] = (o[j - 1] + e[j - 1]) % m;
        o[j] = i[j - 1];
        u[j] = (i[j - 1] + o[j - 1]) % m;
    }
    return (a[n - 1] + e[n - 1] + i[n - 1] + o[n - 1] + u[n - 1]) % m;
};
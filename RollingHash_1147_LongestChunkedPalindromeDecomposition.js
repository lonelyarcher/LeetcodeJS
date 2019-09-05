/* Return the largest possible k such that there exists a_1, a_2, ..., a_k such that:

Each a_i is a non-empty string;
Their concatenation a_1 + a_2 + ... + a_k is equal to text;
For all 1 <= i <= k,  a_i = a_{k+1 - i}.
 
Constraints:

text consists only of lowercase English characters.
1 <= text.length <= 1000 */

/**
 * @param {string} text
 * @return {number}
 */
const code = ch => ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1; //rolling hash, char code can't be zero, which will cause collision
const mod = 10**9 + 7; //avoid overflow
var longestDecomposition = function(text) {
    let l = 0; r = text.length - 1; //two point, move close until exchange position
    let lhash = 0, rhash = 0, pow = 1; //left and right hash, pow will be accumulator of base
    let ans = 0;
    while (l <= r) {
        lhash = (lhash * 27 % mod + code(text.charAt(l++))) % mod; //forward hash
        rhash = (rhash + code(text.charAt(r--)) * pow % mod) % mod; //backward hash
        pow = (pow * 27) % mod;
        if (lhash === rhash) {
            ans += 2;
            if (l - r === 1) return ans; //if last move lr -> rl, will have two same chunks
            if (l - r === 2) return ans - 1; //if last move [l/r] -> r [] l;, will only one chunk
            lhash = rhash = 0; //else, reset and keep moving
            pow = 1;
        }
    }
    return ans + 1; //if the middle part is not match, so will just be one chunk.
};


console.log(longestDecomposition("ghiabcdefhelloadamhelloabcdefghi"));
//Output: 7
//Explanation: We can split the string on "(ghi)(abcdef)(hello)(adam)(hello)(abcdef)(ghi)".


console.log(longestDecomposition("merchant"));
//Output: 1
//Explanation: We can split the string on "(merchant)"


console.log(longestDecomposition("antaprezatepzapreanta"));
//Output: 11
//Explanation: We can split the string on "(a)(nt)(a)(pre)(za)(tpe)(za)(pre)(a)(nt)(a)".


console.log(longestDecomposition("aaaa"));
//Output: 4
//Explanation: We can split the string on "(a)(a)(a)(a)".

console.log(longestDecomposition("aaa"));
//Output: 3
//Explanation: We can split the string on "(a)(a)(a)".

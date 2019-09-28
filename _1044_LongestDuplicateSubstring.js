/* Given a string S, consider all duplicated substrings: (contiguous) substrings of S that occur 2 or more times.  (The occurrences may overlap.)

Return any duplicated substring that has the longest possible length.  (If S does not have a duplicated substring, the answer is "".)

 

Example 1:

Input: "banana"
Output: "ana"
Example 2:

Input: "abcd"
Output: ""
 

Note:

2 <= S.length <= 10^5
S consists of lowercase English letters. */

/**
 * @param {string} S
 * @return {string}
 */
var longestDupSubstring = function(S) {
    let l = 1, r = S.length;
    while(r - l > 1) {
        const mid = parseInt((l + r)/2);
        if (dup(S, mid)) {
            l = mid;
        } else {
            r = mid - 1;
        }
    }
    return dup(S, l) ? dup(S, l) : dup(S, r);
};

const modv = 2**63 - 1;

const dup = (S, len) => {
    const set = new Set();
    const high = len <= 1 ? 1 : Array(len - 1).fill(26).reduce((a, b) => (a*b) % modv);
    for (let i = 0, prev = -1; i <= S.length - len; i++) {
        if (i === 0) {
            prev = hash(S.slice(0, len));
            set.add(prev);
        } else {
            const highHash = (hash(S.charAt(i - 1)) * high) % modv;
            const lowHash = hash(S.charAt(i + len - 1));
            const newHash = ((prev - highHash) * 26 + lowHash) % modv; 
            if (set.has(newHash)) {
                return  S.slice(i, i + len);
            } else {
                set.add(newHash);
                prev = newHash;
            }
        }
    }
    return '';
};

const hash = S => {
    return [...S].reduce((a, b) => (a * 26 + b.charCodeAt(0) - 'a'.charCodeAt(0)) % modv, 0);
};
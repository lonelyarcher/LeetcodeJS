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
    const n = S.length, m = 10**9+7, p = 31;
    const dup = (S, len) => {
        const set = new Set();
        const arr = [...S].map(c => c.charCodeAt(0) - 'a'.charCodeAt(0) + 1); 
        let pl = 1;
        for (let i = 0; i < len; i++) pl = (pl * p) % m; // p**len
        for (let i = 0, h = 0; i <= n - len; i++) {
            if (i === 0) {
                for (let j = i; j < i + len; j++) {
                    h = (h * p % m + arr[j]) % m;
                }
                set.add(h);
            } else {
                h = h * p % m - arr[i - 1] * pl % m + arr[i + len - 1];//rolling hash
                if (set.has(h)) return S.slice(i, i + len);
                set.add(h);
            }
        }
        return '';
    };
    
    //find smallest index which don't have dup
    let l = 1, r = S.length + 1;
    while(l < r) {
        const mid = Math.floor((l + r)/2);
        if (!dup(S, mid)) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return dup(S, l - 1); //largest len which has dup
};


console.log(longestDupSubstring("banana")); //"ana"
console.log(longestDupSubstring("abcd")); //''
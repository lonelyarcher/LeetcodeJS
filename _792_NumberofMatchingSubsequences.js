/* Given string S and a dictionary of words words, find the number of words[i] that is a subsequence of S.

Example :
Input: 
S = "abcde"
words = ["a", "bb", "acd", "ace"]
Output: 3
Explanation: There are three words in words that are a subsequence of S: "a", "acd", "ace".
Note:

All words in words and S will only consists of lowercase letters.
The length of S will be in the range of [1, 50000].
The length of words will be in the range of [1, 5000].
The length of words[i] will be in the range of [1, 50]. */

/**
 * @param {string} S
 * @param {string[]} words
 * @return {number}
 */
const code = c => c.charCodeAt(0) - 'a'.charCodeAt(0);
const higher = (arr, target) => { //find first GT
    let l = 0, r = arr.length;
    while (l < r) {
        const mid = Math.floor((l + r)/2);
        if (arr[mid] > target) r = mid;
        else l = mid + 1;
        return l; 
    }
}; 
var numMatchingSubseq = function(S, words) {
    let ans = 0;
    const map = [...S].reduce((a, c, i) => {
    
        a[code(c)].push(i); 
        return a;
    }, [...Array(26)].map(() => []));
outer:  for (let w of words) {
        let i = 0;
        for (let c of w) {
            if (i > map[code(c)][map[code(c)].length - 1]) continue outer;
            i = higher(map[code(c)], i); 
        }
        ans++;
    }
    return ans;
};

console.log(numMatchingSubseq("abcde", ["a", "bb", "acd", "ace"])); //3
/* Given an array of strings arr. String s is a concatenation of a sub-sequence of arr which have unique characters.

Return the maximum possible length of s.

 

Example 1:

Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All possible concatenations are "","un","iq","ue","uniq" and "ique".
Maximum length is 4.
Example 2:

Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible solutions are "chaers" and "acters".
Example 3:

Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26
 

Constraints:

1 <= arr.length <= 16
1 <= arr[i].length <= 26
arr[i] contains only lower case English letters. */

/**
 * @param {string[]} arr
 * @return {number}
 */
//combination with bit mask. In this case, the concatenations order is not matter, so just make combination will be the answer.
var maxLength = function(arr) {
    const code = a => a.charCodeAt(0) - 'a'.charCodeAt(0);
    const mask = a => new Set([...a]).size < a.length ? 0 : [...a].reduce((a, c) => a | (1 << code(c)), 0);
    const masks = arr.map(a => [a.length, mask(a)]).filter(a => a[1]);
    let max = 0;
    const dfs = (i, [len, m]) => {
        if (len > max) max = len;
        for (let j = i; j < masks.length; j++) {
            if ((m & masks[j][1]) === 0) {
                dfs(j + 1, [len + masks[j][0], m|masks[j][1]]);
            }
        }
    }
    dfs(0, [0, 0]);
    return max;
};

console.log(maxLength(["un","iq","ue"])); //4
console.log(maxLength(["cha","r","act","ers"])); //6
console.log(maxLength(["abcdefghijklmnopqrstuvwxyz"])); //26
/* You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.

You can swap the characters at any pair of indices in the given pairs any number of times.

Return the lexicographically smallest string that s can be changed to after using the swaps.

 

Example 1:

Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"
Example 2:

Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[0] and s[2], s = "acbd"
Swap s[1] and s[2], s = "abcd"
Example 3:

Input: s = "cba", pairs = [[0,1],[1,2]]
Output: "abc"
Explaination: 
Swap s[0] and s[1], s = "bca"
Swap s[1] and s[2], s = "bac"
Swap s[0] and s[1], s = "abc"

 

Constraints:

1 <= s.length <= 10^5
0 <= pairs.length <= 10^5
0 <= pairs[i][0], pairs[i][1] < s.length
s only contains lower case English letters. */

/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function(s, pairs) {
    const n = s.length;
    const parent = [...Array(n)].map((c, i) => i);
    const find = n => {
        if (parent[n] != n) parent[n] = find(parent[n]);
        return parent[n];
    };
    const union = (n1, n2) => {
        parent[find(n1)] = find(n2);
    };
    for (let [s, t] of pairs) {
        union(s, t);
    }
    const gs = {};
    for (let i = 0; i < n; i++) {
        gs[find(i)] = gs[find(i)] || [];
        gs[find(i)].push(i);
    }
    const ans = [...s];
    Object.values(gs).forEach(g => {
        g.map(i => s.charAt(i)).sort().forEach((c, i) => {
            ans[g[i]] = c;
        });
    });
    return ans.join('');
};

console.log(smallestStringWithSwaps(s = "dcab", pairs = [[0,3],[1,2]]));//"bacd"
console.log(smallestStringWithSwaps(s = "dcab", pairs = [[0,3],[1,2],[0,2]]));//abcd
console.log(smallestStringWithSwaps(s = "cba", pairs = [[0,1],[1,2]]));//abc
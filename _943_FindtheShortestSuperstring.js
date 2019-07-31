/* Given an array A of strings, find any smallest string that contains each string in A as a substring.

We may assume that no string in A is substring of another string in A.

 
Example 1:

Input: ["alex","loves","leetcode"]
Output: "alexlovesleetcode"
Explanation: All permutations of "alex","loves","leetcode" would also be accepted.
Example 2:

Input: ["catg","ctaagt","gcta","ttca","atgcatc"]
Output: "gctaagttcatgcatc"
 

Note:

1 <= A.length <= 12
1 <= A[i].length <= 20 */
/**
 * @param {string[]} A
 * @return {string}
 */
//dfs
var shortestSuperstring = function(A) {
    const n = A.length;
    const dist = [...Array(n)].map(() => Array(n).fill(0));
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A.length; j++) {
            dist[i][j] = A[j].length;
            for (let k = 1; k < A[i].length; k++) {
                if (A[i].slice(-k) === A[j].slice(0,k)) dist[i][j] = A[j].length - k;
            }
        }
    }
    let shortest;
    const dfs = (path, visited, last) => {
        if (path.length >= shortest.length) return;
        if (visited === 2^n - 1) {
            shortest = path;
            return;
        }
        A.forEach((a, i) => {
            if (visited & 2^i === 0) {
                const nPath = path.concat(last === undefined ? a : a.slice(-dist[last][i]));
                dfs(nPath, visited + 2^i, a);
            }
        });
    };
    dfs('', 0, undefined);
    return shortest;
};
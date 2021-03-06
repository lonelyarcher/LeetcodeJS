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
var shortestSuperstring_dfs = function(A) {
    const n = A.length;
    const dist = [...Array(n)].map(() => Array(n).fill(0));
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A.length; j++) {
            dist[i][j] = A[j].length;
            for (let k = 1; k <= A[i].length; k++) {
                if (A[i].slice(-k) === A[j].slice(0,k)) dist[i][j] = A[j].length - k;
            }
        }
    }
    let shortest = A.reduce((a, c) => a + c);
    const dfs = (path, visited, last) => {
        if (path.length >= shortest.length) return;
        if (visited === (1<<n) - 1) {
            shortest = path;
            return;
        }
        A.forEach((a, i) => {
            if ((visited & (1<<i)) === 0) {
                const nPath = path.concat(last === undefined ? a : a.slice(-dist[last][i]));
                dfs(nPath, visited + (1<<i), i);
            }
        });
    };
    dfs('', 0, undefined);
    return shortest;
};

//dp
var shortestSuperstring_dp = function(A) {
    const n = A.length;
    const dist = [...Array(n)].map(() => Array(n).fill(''));
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A.length; j++) {
            dist[i][j] = A[j];
            for (let k = 1; k <= A[i].length; k++) {
                if (A[i].slice(-k) === A[j].slice(0,k)) dist[i][j] = A[j].slice(k);
            }
        }
    }
    console.log(dist.map(r => r.join()).join("|"));
    const dp = [...Array(1<<n)].map(()=>Array(n).fill(undefined));
    A.forEach((a, i) => dp[1<<i][i] = a);
    //upgrade dimension, put the last word in the second dimension j, dp[i][j] i is the state of combination, j is the last word index of this combination.
    for (let i = 1; i < (1<<n); i++) {
        for (let j = 0; j < n; j++) {
            if ((i & (1<<j)) > 0) {
                for (let k = 0; k < n; k++) {
                    if (((i - (1<<j)) & (1<<k)) > 0) {
                        const nij = dp[i - (1<<j)][k] + dist[k][j];
                        if (!dp[i][j] || nij.length < dp[i][j].length) dp[i][j] = nij;
                    }
                }
            }
        }
    }
    return dp[(1<<n) - 1].reduce((a, c) => c ? (c.length < a.length ? c : a) : a);
};

//memorized search
var shortestSuperstring_memo = function(A) {
    const n = A.length;
    const join = [...Array(n)].map(() => Array(n).fill(''));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            join[i][j] = A[j];
            for (let k = 1; k <= A[i].length; k++) {
                if (A[i].slice(-k) === A[j].slice(0,k)) join[i][j] = A[j].slice(k);
            }
        }
    }
    const m = [...Array(1<<n)].map(()=>Array(n).fill(undefined));
    
    const search = (i, j) => {
        if (i === 2**j) return A[j];
        if (m[i][j]) return m[i][j];
        for (let k = 0; k < n; k++) {
            if (((i - 2**j) & 2**k) > 0) {
                const nj = search(i - 2**j, k) + join[k][j];
                if (!m[i][j] || nj.length < m[i][j].length) m[i][j] = nj;
            }
        }
        return m[i][j];
    };
    
    let ans = A.reduce((a, c) => a + c);
    for (let j = 0; j < n; j++) {
        m[2**n - 1][j] = search(2**n - 1, j);
        //console.log(m[2**n - 1][j]);
        if (m[2**n - 1][j].length < ans.length) ans = m[2**n - 1][j];
    }
    return ans;
};



console.log(shortestSuperstring_memo(["catg","ctaagt","gcta","ttca","atgcatc"]));  //"gctaagttcatgcatc"
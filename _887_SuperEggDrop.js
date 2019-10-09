/* You are given K eggs, and you have access to a building with N floors from 1 to N. 

Each egg is identical in function, and if an egg breaks, you cannot drop it again.

You know that there exists a floor F with 0 <= F <= N such that any egg dropped at a floor higher than F will break, and any egg dropped at or below floor F will not break.

Each move, you may take an egg (if you have an unbroken one) and drop it from any floor X (with 1 <= X <= N). 

Your goal is to know with certainty what the value of F is.

What is the minimum number of moves that you need to know with certainty what F is, regardless of the initial value of F?

 

Example 1:

Input: K = 1, N = 2
Output: 2
Explanation: 
Drop the egg from floor 1.  If it breaks, we know with certainty that F = 0.
Otherwise, drop the egg from floor 2.  If it breaks, we know with certainty that F = 1.
If it didn't break, then we know with certainty F = 2.
Hence, we needed 2 moves in the worst case to know what F is with certainty.
Example 2:

Input: K = 2, N = 6
Output: 3
Example 3:

Input: K = 3, N = 14
Output: 4
 

Note:

1 <= K <= 100
1 <= N <= 10000 */

/**
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
//if take x floor, if unbroken, f(k, n) = Min(Max(f(k, n - x), f(k - 1, x - 1)) x = 1 to n)
var superEggDrop = function(K, N) {
    const dp = [...Array(K + 1)].map(() => Array(N + 1).fill(undefined));
    const f = (k, n) => {
        if (n === 0) return 0;
        if (k === 0) return Infinity; 
        if (dp[k][n] !== undefined) return dp[k][n];
        dp[k][n] = Infinity;
        for (let i = 1; i <= n; i++) {
            dp[k][n] = Math.min(dp[k][n], 1 + Math.max(f(k - 1, i - 1), f(k, n - i)));
        }
        return dp[k][n];
    };
    return f(K, N);
};

console.log(superEggDrop(K = 1, N = 2)); //2
console.log(superEggDrop(K = 2, N = 6)); //3
console.log(superEggDrop(K = 3, N = 14)); //4
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
//if take x floor, if unbroken, f(k, n) = Min(Max(f(k, n - x), f(k - 1, x - 1)) x = 1 to n), O(K*N^2), TLE
var superEggDrop_bruteForce = function(K, N) {
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

//Binary Search, Max(Min(f(1), f(2))), f(1) increases on i (right part of V diagram), f(2) decrease on i (left part of V), there is a point where f(1) and f(2) cross and it is the min value of Max(f1, f2)
//we can use binary search to find out this point, O(k*N*log(N))
var superEggDrop_binary_search = function(K, N) {
    const dp = [...Array(K + 1)].map(() => Array(N + 1).fill(undefined));
    const f = (k, n) => {
        if (n === 0) return 0;
        if (k === 1) return n; 
        if (dp[k][n] !== undefined) return dp[k][n];
        //binary search
        let l = 1, r = n;
        while (l < r) {
            const mid = ~~((l + r) / 2);
            const f1 = f(k - 1, mid - 1);
            const f2 = f(k, n - mid);
            if (f1 > f2) r = mid - 1;
            else if (f1 < f2) l = mid + 1;
            else l = r = mid;
        }
        dp[k][n] = 1 + Math.max(f(k - 1, l - 1), f(k, n - l));
        return dp[k][n];
    };
    return f(K, N);
};

//Suppose a function func(n) => x, find correct x, to make Max(f(k - 1, x - 1), f(k, n - x)) is smallest 
//func is increasing on n, so if we dynamic calculate x[1] = func(1), ..., x[i] must be the number after func[i - 1]
//let do the dp bottom up, n = 0, 1, ..., i - 1, i, ..., n. We can increasing search for x, just one run through the 1 to n, so total time O(K*N)
var superEggDrop = function(K, N) {
    const dp = [...Array(N + 1)].map(() => Array(K + 1).fill(undefined)); 
    for (let i = 1; i <= N; i++) dp[i][1] = i;//when only one egg left, you need try all the floors.
    for (let j = 0; j <= K; j++) dp[0][j] = 0;//init first row, when n = 0, all value = 0;
    
    for (let j = 2; j <= K; j++) { //from j >= 2, two eggs
        let x = 1;
        for (let i = 1; i <= N; i++) { //from the second row, i >= 1
            while (x < i && Math.max(dp[x - 1][j - 1], dp[i - x][j]) > Math.max(dp[x][j - 1], dp[i - x - 1][j])) x++;
            dp[i][j] =  1 + Math.max(dp[x - 1][j - 1], dp[i - x][j]);
        }
    }
    return dp[N][K];
};
console.log(superEggDrop(K = 1, N = 2)); //2
console.log(superEggDrop(K = 1, N = 3)); //3
console.log(superEggDrop(K = 2, N = 6)); //3
console.log(superEggDrop(K = 3, N = 14)); //4
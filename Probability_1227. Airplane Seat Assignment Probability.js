/* n passengers board an airplane with exactly n seats. The first passenger has lost the ticket and picks a seat randomly. 
But after that, the rest of passengers will:

Take their own seat if it is still available, 
Pick other seats randomly when they find their seat occupied 
What is the probability that the n-th person can get his own seat?

 

Example 1:

Input: n = 1
Output: 1.00000
Explanation: The first person can only get the first seat.
Example 2:

Input: n = 2
Output: 0.50000
Explanation: The second person has a probability of 0.5 to get the second seat (when first person gets the first seat).
 

Constraints:

1 <= n <= 10^5 */


//DFS to simulation, since it is about permutation, use visited[](picked) to record states, O(n!)
var nthPersonGetsNthSeat_DFS = function(n) {
    let total = 0, succ = 0;
    const picked = Array(n).fill(false);
    const pick = (i, j, p) => {
         picked[j] = true;
         dfs(i + 1, p);
         picked[j] = false;
    };
    const dfs = (i, p) => {
        if (i === n - 1) {
            if (!picked[n - 1]) succ += p;
            total += p;
            return;
        }
        if (i > 0 && !picked[i]) {
           pick(i, i, p);
        } else {
            p = p / picked.filter(p => !p).length;
            for (let j = 0; j < n; j++) {
                if (!picked[j]) pick(i, j, p);
            }
        }
    };
    dfs(0, 1);
    return succ/total;
};
//DP, 1 to n, dp[1] = 1;, dp[2] = 1/2, dp[3] = 1/2
//dp[i] = 1/i * 1 (if first person pick itself seat) + 1/i * 0 (if picked the last person n's seat) + Sum of p[k] = 1/i * dp[k] (k = 2 to i - 1)
var nthPersonGetsNthSeat_DP = function(n) {
    let dp = Array(n + 1).fill(undefined);
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = 1/i;
        for (let k = 2; k <= i - 1; k++) {
            dp[i] += (1/i) * dp[k];
        }
    }
    return dp[n];
};
//use mathetic induction to approve dp[2] = dp[3] = ... = dp[n] = 1/2
/**
 d[2] = 1/2
 so known: from dp[2] ... dp[i] = 1/2
 let's approve dp[i + 1] = 1/(i + 1) + (i - 1) / (i + 1) * 1/2 = 1/2
 so true
 */
var nthPersonGetsNthSeat = function(n) {
    return n === 1 ? 1 : 1/2;
};




/* There are N piles of stones arranged in a row.  The i-th pile has stones[i] stones.

A move consists of merging exactly K consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these K piles.

Find the minimum cost to merge all piles of stones into one pile.  If it is impossible, return -1.

 

Example 1:

Input: stones = [3,2,4,1], K = 2
Output: 20
Explanation: 
We start with [3, 2, 4, 1].
We merge [3, 2] for a cost of 5, and we are left with [5, 4, 1].
We merge [4, 1] for a cost of 5, and we are left with [5, 5].
We merge [5, 5] for a cost of 10, and we are left with [10].
The total cost was 20, and this is the minimum possible.
Example 2:

Input: stones = [3,2,4,1], K = 3
Output: -1
Explanation: After any merge operation, there are 2 piles left, and we can't merge anymore.  So the task is impossible.
Example 3:

Input: stones = [3,5,1,2,6], K = 3
Output: 25
Explanation: 
We start with [3, 5, 1, 2, 6].
We merge [5, 1, 2] for a cost of 8, and we are left with [3, 8, 6].
We merge [3, 8, 6] for a cost of 17, and we are left with [17].
The total cost was 25, and this is the minimum possible.
 

Note:

1 <= stones.length <= 30
2 <= K <= 30
1 <= stones[i] <= 100 */

/**
 * @param {number[]} stones
 * @param {number} K
 * @return {number}
 */

//input range is 30, exponential and n! will fail, must be DP with O(n^3~4) 
//DP, like shooting the balloon, last step it combine last K pile into one. 
//And the sequence of last K piles is always kept, so we can divide the last K piles into to two part, l piles in left and k - l piles in the right
//target piles number can be our new dimension of subproblem recursion.
//We find subproblem equation:  dp[i][j][k] = min( dp[i][m][l] + dp[m + 1][j][k - l]), where m is [i to j], l [0 to k]
var mergeStones = function(stones, K) {
    let n = stones.length;
    if ((n - 1) % (K - 1) > 0) return -1; //the success of merging depends on the number of stone piles
    //each turn, merge K and return 1, consuming K - 1, at the end there is one left, so (n - 1) % (K - 1) must be zero, so the merging will end with only one pile.
    const preSum = stones.reduce((a, c) => {a.push(c + a[a.length - 1]); return a;}, [0]);
    const m = [...Array(n)].map(() => [...Array(n)].map(() => Array(K + 1).fill(undefined)));//initiate 3D array
    const sub = (l, r, k) => {
        if (r - l + 1 < k) return Infinity; //if number of piles less than target, which is impossible, so return Infinity, which will be excluded in Math.min later
        if (r - l + 1 === k) return 0;//if the number equals target k, just do nothing, cost is zero
        if (k === 1) return sub(l, r, K) + preSum[r + 1] - preSum[l];
        //if target is one, so we must merge from K piles in last step, and merging cost is the sum of all piles from l to r
        //so it will sub to sub(l, r, K) and cost of sum(l, r) which can be calculated by preSum array
        if (m[l][r][k] !== undefined) return m[l][r][k]; //memorization
        m[l][r][k] = Infinity;//init with Infinity
        for (let i = l; i < r; i += K - 1) { 
            //try divide, left at least take one, and at most take r - 1, otherwise it didn't divided into subproblems.
            //we can always divide left part to be merged into one pile, and the right k - 1 pile, because we can move the i to accomplish it.
            /* for (let j = 1; j < k; j++) { //divide the k to two part. No need to consider all the combination like (1, k-1), (2, k-2) ... (k-1, 1)
                m[l][r][k] = Math.min(m[l][r][k], sub(l, i, j) + sub(i + 1, r, k - j)); //take the min divide will be the ans
            } */
            //since left always be 1 pile, so when move i, i could be 1, 1 + K - 1, 1 + (K - 1) *2, ..., so we can move by i += K - 1
            m[l][r][k] = Math.min(m[l][r][k], sub(l, i, 1) + sub(i + 1, r, k - 1));
        }
        return m[l][r][k];
    }
    return sub(0, n - 1, 1);//ans of merge all to one pile
};

//further more, if the piles can be ultimately merged into one pile, so whatever we merge the left part into on pile, the right pile must be merged to K - 1. 
//so we don't need care about the third dimension k, just dp[i][j] is enough to subproblem

var mergeStones_2D = function(stones, K) {
    let n = stones.length;
    if ((n - 1) % (K - 1) > 0) return -1; //the success of merging depends on the number of stone piles
    //each turn, merge K and return 1, consuming K - 1, at the end there is one left, so (n - 1) % (K - 1) must be zero, so the merging will end with only one pile.
    const preSum = stones.reduce((a, c) => {a.push(c + a[a.length - 1]); return a;}, [0]);
    const m = [...Array(n)].map(() => Array(n).fill(undefined));//initiate 2D array
    const sub = (l, r) => {
        if (l === r) return 0;
        if (m[l][r] !== undefined) return m[l][r]; //memorization
        m[l][r] = Infinity;//init with Infinity
        for (let i = l; i < r; i += K - 1) { 
            m[l][r] = Math.min(m[l][r], sub(l, i) + sub(i + 1, r));
        }
        if ((r - l) % (K - 1) === 0) m[l][r] += preSum[r + 1] - preSum[l];
        return m[l][r];
    }
    return sub(0, n - 1);//ans of merge all to one pile
};

console.log(mergeStones_2D([3,2,4,1], 2)); //20
console.log(mergeStones_2D([3,5,1,2,6], K = 3)); //25
console.log(mergeStones_2D([3,2,4,1], 3)); //-1

/* You are given a list of blocks, where blocks[i] = t means that the i-th block needs t units of time to be built. A block can only be built by exactly one worker.

A worker can either split into two workers (number of workers increases by one) or build a block then go home. Both decisions cost some time.

The time cost of spliting one worker into two workers is given as an integer split. Note that if two workers split at the same time, they split in parallel so the cost would be split.

Output the minimum time needed to build all blocks.

Initially, there is only one worker.

 

Example 1:

Input: blocks = [1], split = 1
Output: 1
Explanation: We use 1 worker to build 1 block in 1 time unit.
Example 2:

Input: blocks = [1,2], split = 5
Output: 7
Explanation: We split the worker into 2 workers in 5 time units then assign each of them to a block so the cost is 5 + max(1, 2) = 7.
Example 3:

Input: blocks = [1,2,3], split = 1
Output: 4
Explanation: Split 1 worker into 2, then assign the first worker to the last block and split the second worker into 2.
Then, use the two unassigned workers to build the first two blocks.
The cost is 1 + max(3, 1 + max(1, 2)) = 4.
 

Constraints:

1 <= blocks.length <= 1000
1 <= blocks[i] <= 10^5
1 <= split <= 100 */

/**
 * @param {number[]} blocks
 * @param {number} split
 * @return {number}
 */
//DP O(n^2)
//we initially have n blocks and 1 worker, save the num of blocks i, and workers j as state
//we need to make decision divide worker to build  or split, let's say in some time, we put k worker to build, k can be zero
//of course we will give them largest block to build to save the time.(greedy, sort the blocks first)
//dp[i][j] = min(dp[i][2*j] + split (when k = 0), Math.max(blocks[i - 1], dp[i - 1][j - 1]) (when k = 1), ..., )
//we can see, if we expend dp[i - 1][j - 1] = min(split + sp[i - 1][2 *j - 2], Math.max(blocks[i - 2], dp[i - 2][j - 2], ... ))
//so dp[i - 1][j - 1] already include all the dp[i - 2][j - 2] ... to k
var minBuildTime = function(blocks, split) {
    blocks.sort((a, b) => a - b);
    const n = blocks.length;
    const m = [...Array(n + 1)].map(() => Array(n + 1).fill(undefined));
    const sub = (i, j) => {
        if (i === 0) return 0; 
        if (j === 0) return Infinity;
        if (j >= i) return blocks[i - 1];
        if (m[i][j] !== undefined) return m[i][j];
        m[i][j] = Math.min(split + sub(i, 2*j), Math.max(blocks[i - 1], sub(i - 1, j - 1))); 
        //Straightful, you need to calculate min of all [i, i-1, i-2, ..., i-k], 
        //but i - 1 will use the same logic to cover min of [i - 1, i - 2, ..., i - k]
        //so avoid repeating calculate, just take min of i and i - 1 is enough, time complexity from O(n) to o(1), since we have cached all pairs
        return m[i][j];
    };
    return sub(n, 1);
};
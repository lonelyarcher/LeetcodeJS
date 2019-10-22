/* We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i].

You're given the startTime , endTime and profit arrays, you need to output the maximum profit you can take such that there are no 2 jobs in the subset with overlapping time range.

If you choose a job that ends at time X you will be able to start another job that starts at time X.

 

Example 1:



Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
Explanation: The subset chosen is the first and fourth job. 
Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.
Example 2:




Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
Explanation: The subset chosen is the first, fourth and fifth job. 
Profit obtained 150 = 20 + 70 + 60.
Example 3:



Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
Output: 6
 

Constraints:

1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4
1 <= startTime[i] < endTime[i] <= 10^9
1 <= profit[i] <= 10^4 */

/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function(startTime, endTime, profit) {
    const jobs = startTime.map((c, i) => [c, endTime[i], profit[i]]).sort((a, b) => a[1] - b[1]);
    const dp = Array(jobs.length + 1).fill(0);
    const biset_right = (arr, target) => {
        let l = 0; r = arr.length;
        while (l < r) {
            let mid = ~~((l + r) / 2);
            if (arr[mid][1] > target) r = mid;
            else l = mid + 1;
        }
        return l;
    };
    for (let i = 1; i <= jobs.length; i++) {
        const k = biset_right(jobs, jobs[i - 1][0]) - 1;
        dp[i] = Math.max(dp[i - 1], k >= 0 ? dp[k + 1] + jobs[i - 1][2] : jobs[i - 1][2]);
    }
    return dp[jobs.length];
};
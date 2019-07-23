/*
ay you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most k transactions.

Note:
You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
*/

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
    if(!prices.length || k === 0) return 0;
    if(k>=prices.length/2) return prices.reduce((a, c, i) => i > 0 && c > prices[i - 1] ? a + c - prices[i - 1] : a, 0);
    const sell = [...Array(prices.length)].map(a => Array(k + 1).fill(0));
    const buy  = [...Array(prices.length)].map(a => Array(k + 1).fill(-prices[0]));
    for (let i = 1; i < prices.length; i++) {
        for (let j = 1; j <= k; j++) {
            sell[i][j] = Math.max(sell[i - 1][j], prices[i] + buy[i - 1][j - 1]);
            buy[i][j]  = Math.max(buy[i - 1][j],  -prices[i] + sell[i - 1][j - 1]);
        }
    }
    return sell[prices.length - 1][k];
};

console.log(maxProfit(k = 2, [2,4,1])); //2.
console.log(maxProfit(k = 2, [3,2,6,5,0,3])); //Output: 7
console.log(maxProfit(k = 2, [2,1,4,5,2,9,7])); //Output: 11
console.log(maxProfit(k = 2, [3,3,5,0,0,3,1,4])); //6


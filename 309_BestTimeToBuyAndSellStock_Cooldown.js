
/* Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) with the following restrictions:

You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
Example:

Input: [1,2,3,0,2]
Output: 3 
Explanation: transactions = [buy, sell, cooldown, buy, sell] */

var maxProfit = function(prices) {
    const n = prices.length;
    if (n === 0) return 0;
    const buy = [-prices[0]];
    const sell = [0];
    for (let i = 1; i < n; i ++) {
        buy[i] = Math.max(-prices[i] + (sell[i - 2] || 0), buy[i - 1]);
        sell[i] = Math.max(sell[i - 1], prices[i] + buy[i - 1]);
    }
    return sell[n - 1];
};

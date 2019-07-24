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
    const sell = [...Array(prices.length + 1)].map(a => Array(k + 1).fill(0));
    const buy  = [...Array(prices.length + 1)].map(a => Array(k + 1).fill(0));
    for (let i = 1; i <= prices.length; i++) {
        for (let j = 1; j <= k; j++) {
            sell[i][j] = i === 1 ? 0 : Math.max(sell[i - 1][j], prices[i - 1] + buy[i - 1][j]); //when only one price, sell cannot happed, so zero profit
            buy[i][j]  = i === 1 ? -prices[0] : Math.max(buy[i - 1][j],  -prices[i - 1] + sell[i - 1][j - 1]); //when only one price, buy must buy it, so -prices[0]
        }
    }
    return sell[prices.length][k];
};

var maxProfit_optimization = function(k, prices) { //reduce the dimension to save the space
    if(!prices.length || k === 0) return 0;
    if(k>=prices.length/2) return prices.reduce((a, c, i) => i > 0 && c > prices[i - 1] ? a + c - prices[i - 1] : a, 0);
    const sell = Array(k + 1).fill(0);
    const buy  = Array(k + 1).fill(-prices[0]);
    for (let i = 1; i < prices.length; i++) {
        for (let j = k; j > 0; j--) { //backward, because buy[j] depends on sell[j - 1] which should be last sell[i - 1][j - 1]
            sell[j] = Math.max(sell[j], prices[i] + buy[j]); //calculate sell[j] first, because it depends on buy[j], but buy[j] didn't depends on sell[j]
            buy[j]  = Math.max(buy[j],  -prices[i] + sell[j - 1]);
        }
    }
    return sell[k];
};

//console.log(maxProfit(k = 2, [2,4,1])); //2.
console.log(maxProfit_optimization(k = 2, [2,1,2,0,1])); //2
//console.log(maxProfit(k = 2, [3,2,6,5,0,3])); //Output: 7
//console.log(maxProfit(k = 2, [2,1,4,5,2,9,7])); //Output: 11
//console.log(maxProfit(k = 2, [3,3,5,0,0,3,1,4])); //6


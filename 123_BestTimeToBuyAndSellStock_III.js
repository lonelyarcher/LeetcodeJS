/** trade twice and max profit 
Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most two transactions.

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).*/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let max = -Infinity, min = Infinity;  
    const forward = prices.reduce((a, c) => {
        min = Math.min(min, c);
        a.push(Math.max(a[a.length - 1], c - min));
        return a;
    }, [0]);
    console.log(forward.join());
    const backward = prices.reduceRight((a, c) => {
        max = Math.max(max, c);
        a.unshift(Math.max(a[0], max - c));
        return a;
    }, [0]);
    console.log(backward.join());
    return forward.reduce((a, c, i) => Math.max(a, c + backward[i]), 0);
};
console.log(maxProfit([1, 2, 5, 3, 4]));
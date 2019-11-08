/* There are N workers.  The i-th worker has a quality[i] and a minimum wage expectation wage[i].

Now we want to hire exactly K workers to form a paid group.  When hiring a group of K workers, we must pay them according to the following rules:

Every worker in the paid group should be paid in the ratio of their quality compared to other workers in the paid group.
Every worker in the paid group must be paid at least their minimum wage expectation.
Return the least amount of money needed to form a paid group satisfying the above conditions.

 

Example 1:

Input: quality = [10,20,5], wage = [70,50,30], K = 2
Output: 105.00000
Explanation: We pay 70 to 0-th worker and 35 to 2-th worker.
Example 2:

Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], K = 3
Output: 30.66667
Explanation: We pay 4 to 0-th worker, 13.33333 to 2-th and 3-th workers seperately. 
 

Note:

1 <= K <= N <= 10000, where N = quality.length = wage.length
1 <= quality[i] <= 10000
1 <= wage[i] <= 10000
Answers within 10^-5 of the correct answer will be considered correct. */

/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} K
 * @return {number}
 */
//O(n^2logn) a person is paid by his minimum wage expectation is call ratio maker, he make the ratio wage/quality
//then every other paid by this ratio, multiply his quality
//so try everyone as ratio maker, find out first K mini paid user, sum is the answer.
var mincostToHireWorkers = function(quality, wage, K) {
    const n = wage.length;
    let min = Infinity;
    L1:
    for (let m = 0; m < n; m++) {
        const pay = [], ratio = wage[m] / quality[m];
        for (let j = 0; j < n; j++) {
            pay.push(quality[j]*ratio + 0.00001 < wage[j] ? Infinity : quality[j]*ratio);
        }
        min = Math.min(min, pay.sort((a, b) => a - b).slice(0, K).reduce((a, c) => a + c)); 
    }
    return min;
};

//O(n*logn) same as the first solution according to choose who to be ratio maker, we first sort the worker by his ratio
//we have first k worker with minimum ratio, to satisfy every worker's mini wage, the last worker with maximum ratio is the ratio maker.
//total team wages = sum of team quality * ratio of ratio maker
//if we increase the ratio, then more worker can join and we can poll out the maximum quality worker as greedy as we can get mini total wages
//by increasing one by one and poll out max quality, we can find out the global mini wages total.
var mincostToHireWorkers = function(quality, wage, K) {
    const n = wage.length, heap = [];
    const w = wage.map((c, i) => i);
    const ratio = a => wage[a]/quality[a];
    w.sort((a, b) => ratio(a) - ratio(b));
    const removeMaxQuality = arr => { //will be O(logn) if Heap implementation as Python or Java
        const maxC = Math.max(...arr.map(a => quality[a])); 
        return arr.splice(arr.findIndex(a => quality[a] === maxC), 1)[0];
    };
    let min = Infinity, sumQ = 0;//optimization: accumulate the sum of quality
    for (let i = 0; i < n; i++) { //optimization, add heap in one loop, if < k, just add, if > k, remove max quality, if === k, calculate total wage
        heap.push(w[i]);
        sumQ += quality[w[i]]; 
        if (heap.length > K) {
            const j = removeMaxQuality(heap);
            sumQ -= quality[j];
        }
        if (heap.length === K) {
            min = Math.min(min, sumQ * ratio(heap[heap.length - 1]));
        }
    }
    return min;
};
console.log(mincostToHireWorkers(quality = [10,20,5], wage = [70,50,30], K = 2)); //105.00000
console.log(mincostToHireWorkers(quality = [3,1,10,10,1], wage = [4,8,2,2,7], K = 3)); // 30.66667


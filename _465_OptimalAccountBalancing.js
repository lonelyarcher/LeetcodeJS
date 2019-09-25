/* A group of friends went on holiday and sometimes lent each other money. For example, Alice paid for Bill's lunch for $10. Then later Chris gave Alice $5 for a taxi ride. We can model each transaction as a tuple (x, y, z) which means person x gave person y $z. Assuming Alice, Bill, and Chris are person 0, 1, and 2 respectively (0, 1, 2 are the person's ID), the transactions can be represented as [[0, 1, 10], [2, 0, 5]].

Given a list of transactions between a group of people, return the minimum number of transactions required to settle the debt.

Note:

A transaction will be given as a tuple (x, y, z). Note that x ≠ y and z > 0.
Person's IDs may not be linear, e.g. we could have the persons 0, 1, 2 or we could also have the persons 0, 2, 6.
Example 1:

Input:
[[0,1,10], [2,0,5]]

Output:
2

Explanation:
Person #0 gave person #1 $10.
Person #2 gave person #0 $5.

Two transactions are needed. One way to settle the debt is person #1 pays person #0 and #2 $5 each.
Example 2:

Input:
[[0,1,10], [1,0,1], [1,2,5], [2,0,5]]

Output:
1

Explanation:
Person #0 gave person #1 $10.
Person #1 gave person #0 $1.
Person #1 gave person #2 $5.
Person #2 gave person #0 $5.

Therefore, person #1 only need to give person #0 $4, and all debt is settled. */

/**
 * @param {number[][]} transactions
 * @return {number}
 */
//DP, debt problem (NP) can be convert to find subset sum problem which can be solved by DP
var minTransfers = function(transactions) {
    let p = transactions.reduce((a, c) => {
        a[c[0]] = (a[c[0]] || 0) + c[2];
        a[c[1]] = (a[c[1]] || 0) - c[2];
        return a;
    }, []).filter(i => i).sort();
    //find minimum subset sum = 0, then in this subset, transaction will subset.length - 1; 
    //DP subset sum neet all possible sum value, from negative sum to positive sum.
    const min = p.filter(i => i < 0).reduce((a, c) => a + c, 0);
    const max = p.filter(i => i > 0).reduce((a, c) => a + c, 0);
    //find subset of arr which sum equals to 0 
    let m;
    const sub = (i, j) => {
        if (j === p[i]) return [i];
        if (i === 0) return null;
        if (m[i][j] !== undefined) return m[i][j];
        const p1 = sub(i - 1, j);
        let p2 = sub(i - 1, j - p[i])
        if (p2) p2 = p2.concat([i]);  
        if (p1 === null) m[i][j] = p2;
        else if (p2 === null) m[i][j] = p1;
        else if (p1.length <= p2.length) m[i][j] = p1;
        else m[i][j] = p2;
        return m[i][j];
    };
    let ans = 0;
    while (p.length) {
        m = [...Array(p.length)].map(_ => ({}));
        const subset = sub(p.length - 1, 0);
        ans += subset.length - 1;
        p = p.filter((c, i) => !subset.includes(i));
    }
    return ans;
};

console.log(minTransfers([[1,5,8],[8,9,8],[2,3,9],[4,3,1]]));
console.log(minTransfers([[2,0,5],[3,4,4]])); //2
console.log(minTransfers([[0,1,10], [2,0,5]]));//2
console.log(minTransfers([[0,1,10], [1,0,1], [1,2,5], [2,0,5]]));//1
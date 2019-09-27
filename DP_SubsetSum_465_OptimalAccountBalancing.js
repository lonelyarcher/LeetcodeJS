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
//DP, debt problem (NP) can be convert to find subset sum problem which can be solved by DP, a polynomial time
var minTransfers_DP = function(transactions) {
    let debts = transactions.reduce((a, c) => { //calculate debts for each person, filter out who has zero debt
        a[c[0]] = (a[c[0]] || 0) + c[2];
        a[c[1]] = (a[c[1]] || 0) - c[2];
        return a;
    }, []).filter(i => i).sort();
    //find subset of arr which sum equals to 0, sub[i, j] = sub[i - 1, j] || sub[i - 1, j - arr[i]] + arr[i]
    let m;
    const sub = (i, j) => {
        if (j === debts[i]) return [i];//when debt i has the same value as the target, that is what we need, shortest answer
        if (i === 0) return null; //when reach last person, still has target sum not equal to its value, return null which means no way
        if (m[i][j] !== undefined) return m[i][j];
        const p1 = sub(i - 1, j);
        let p2 = sub(i - 1, j - debts[i])
        if (p2) p2 = p2.concat([i]); //p2 are from cache m, be careful to keep it immutability
        if (p1 === null) m[i][j] = p2;
        else if (p2 === null) m[i][j] = p1;
        else if (p1.length <= p2.length) m[i][j] = p1;//choose the shortest subset
        else m[i][j] = p2;
        return m[i][j];
    };
    let ans = 0;
    while (debts.length) {
        m = [...Array(debts.length)].map(_ => ({}));//when map to {}, {} is first treated as a block, so need to add () to make it to be empty object
        const subset = sub(debts.length - 1, 0);//when find a minimum subset which sum = zero and length is n, the mini transaction is n - 1
        ans += subset.size - 1;
        debts = debts.filter((c, i) => !subset.includes(i));//remove the subset from the list and run the subset sum dp again
    }
    return ans;
};

//DFS, based on assumption, one person must solved the debt with a person who has opposite debit to him.
//and it doesn't matter the order they solving. Only care of subset of solving chain.
//it is actually explained in DP soluction, if we can find subset sum equals zero, then they can solved inside the set ignore the order.
var minTransfers = function(transactions) {
    let debts = transactions.reduce((a, c) => { //calculate debts for each person, filter out who has zero debt
        a[c[0]] = (a[c[0]] || 0) + c[2];
        a[c[1]] = (a[c[1]] || 0) - c[2];
        return a;
    }, []).filter(i => i);
    const dfs = i => { //i will begin with first non-zero one
        while (i < debts.length && debts[i] === 0) i++;
        if (i === debts.length) return 0;
        let ans = Infinity;
        for (let j = i + 1; j < debts.length; j++) { //i to others
            if (debts[i] * debts[j] < 0) {
                debts[j] += debts[i];
                ans = Math.min(ans, 1 + dfs(i + 1)); //remove i, and recursion
                debts[j] -=  debts[i];
            }
        }
        return ans; 
    };
    return dfs(0);
};

console.log(minTransfers([[1,5,8],[8,9,8],[2,3,9],[4,3,1]]));//4
console.log(minTransfers([[2,0,5],[3,4,4]])); //2
console.log(minTransfers([[0,1,10], [2,0,5]]));//2
console.log(minTransfers([[0,1,10], [1,0,1], [1,2,5], [2,0,5]]));//1
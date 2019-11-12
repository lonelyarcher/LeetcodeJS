/* N couples sit in 2N seats arranged in a row and want to hold hands. We want to know the minimum number of swaps so that every couple is sitting side by side. A swap consists of choosing any two people, then they stand up and switch seats.

The people and seats are represented by an integer from 0 to 2N-1, the couples are numbered in order, the first couple being (0, 1), the second couple being (2, 3), and so on with the last couple being (2N-2, 2N-1).

The couples' initial seating is given by row[i] being the value of the person who is initially sitting in the i-th seat.

Example 1:

Input: row = [0, 2, 1, 3]
Output: 1
Explanation: We only need to swap the second (row[1]) and third (row[2]) person.
Example 2:

Input: row = [3, 2, 0, 1]
Output: 0
Explanation: All couples are already seated side by side.
Note:

len(row) is even and in the range of [4, 60].
row is guaranteed to be a permutation of 0...len(row)-1. */

/**
 * @param {number[]} row
 * @return {number}
 */
//HSA - Happy Swap Assumption: any swap will make at least one couple happy, so every unmatched couple need one and only one swap.
//let's construct the couch array, [0, 0] matched, [1, 2] [2, 1] unmatched, one swap can make both couple 1, 2 happy.
//let's connect couch as graph, if two couches share a same couple, connect them.
//so target is:[0, 0], [1, 1], [2, 2]..., N connected components. If you current has n connected component which is a connected cycle in graphy
//the mini sway is N - n
//O(n)
var minSwapsCouples = function(row) {
    //construct adjacent couches.
    const N = ~~(row.length/2);
    const couches = [...Array(N)].map((c, i) => [~~(row[i * 2] / 2), ~~(row[i * 2 + 1] / 2)]);
    //construct adj list
    const adj = [...Array(N)].map(() => []);
    for (let [i, c] of couches.entries()) {
        adj[c[0]].push(i);
        adj[c[1]].push(i);
    }
    //find next connected node
    const next = (i, j) => {
        let [a, b] = adj[couches[i][j]];
        const ni = i === a ? b : a;
        const nj = couches[ni][0] === couches[i][j] ? 1 : 0;
        return [ni, nj];
    }
    //calculate num of connected components (cc)
    let cc = 0; 
    const visited = new Set();
    for (let i = 0; i < N; i++) {
        if (visited.has(i)) continue;
        visited.add(i);
        cc++;
        if (couches[i][0] !== couches[i][1]) {
            let [ni, nj] = next(i, 0);
            while (ni !== i) {
                visited.add(ni);
                [ni, nj] = next(ni, nj);
            }
        }
    }
    return N - cc;
};

//O(n^2), swap as long as it make couple together, each loop only swap once, take O(n). total O(n^2)
//easy to code, do whatever it can until all finish or no change. so you can do once a loop in for/while
var minSwapsCouples_1 = function(row) {
    let ans = 0;
    for (let i = 0; i < row.length; i += 2) {
        const x = row[i];
        if ((x^1) !== row[i + 1]) {
            ans++;
            for (let j = i + 2; j < row.length; j++) {
                if (row[j] === (x^1)) {
                    [row[j], row[i + 1]] = [row[i + 1], row[j]];
                    break;
                }
            }
        }
    }
    return ans;
};
console.log(minSwapsCouples_1([0, 2, 1, 3])); //1
console.log(minSwapsCouples_1([5,4,2,6,3,1,0,7])); //2
console.log(minSwapsCouples_1([3, 2, 0, 1])); //0
/* You are given an array colors, in which there are three colors: 1, 2 and 3.

You are also given some queries. Each query consists of two integers i and c, return the shortest distance between the given index i and the target color c. If there is no solution return -1.

 

Example 1:

Input: colors = [1,1,2,1,3,2,2,3,3], queries = [[1,3],[2,2],[6,1]]
Output: [3,0,3]
Explanation: 
The nearest 3 from index 1 is at index 4 (3 steps away).
The nearest 2 from index 2 is at index 2 itself (0 steps away).
The nearest 1 from index 6 is at index 3 (3 steps away).
Example 2:

Input: colors = [1,2], queries = [[0,3]]
Output: [-1]
Explanation: There is no 3 in the array.
 

Constraints:

1 <= colors.length <= 5*10^4
1 <= colors[i] <= 3
1 <= queries.length <= 5*10^4
queries[i].length == 2
0 <= queries[i][0] < colors.length
1 <= queries[i][1] <= 3 */

/**
 * @param {number[]} colors
 * @param {number[][]} queries
 * @return {number[]}
 */
const floor = (a, k) => { // last LE = first GT - 1
    let l = 0, r = a.length;
    while (l < r) {
        const mid = parseInt((l + r) / 2);
        if (a[mid] > k) r = mid;
        else l = mid + 1;
    }
    return l - 1;
};

const ceiling = (a, k) => { //  first GE
    let l = 0, r = a.length;
    while (l < r) {
        const mid = parseInt((l + r) / 2);
        if (a[mid] >= k) r = mid;
        else l = mid + 1;
    }
    return l;
};

const insert_left = (a, k) => { //  first GE
    let l = 0, r = a.length;
    while (l < r) {
        const mid = parseInt((l + r) / 2);
        if (a[mid] >= k) r = mid;
        else l = mid + 1;
    }
    return l;
};

const insert_right = (a, k) => { //  first GT
    let l = 0, r = a.length;
    while (l < r) {
        const mid = parseInt((l + r) / 2);
        if (a[mid] > k) r = mid;
        else l = mid + 1;
    }
    return l;
};

var shortestDistanceColor = function(colors, queries) {
    const a = [[], [], []];
    for (let [i, c] of colors.entries()) {
        a[c - 1].push(i);
    }
    const ans = [];
    for (let q of queries) {
        const arr = a[q[1] - 1];
        if (!arr.length) ans.push(-1);
        else {
            const key = insert_right(arr, q[0]);
            if (key === 0) ans.push(arr[key] - q[0]);
            else if (key === arr.length) ans.push(q[0] - arr[arr.length - 1]);
            else ans.push(Math.min(q[0] - arr[key - 1], arr[key] - q[0]));
        }   
    }
    return ans;
};

console.log(shortestDistanceColor([3,2,2,1,3,1,1,1,3,1], [[0,3],[2,1],[2,3],[6,3],[4,1],[1,2]])); //[0,1,2,2,1,0]
console.log(shortestDistanceColor(colors = [1,1,2,1,3,2,2,3,3], queries = [[1,3],[2,2],[6,1]])); //[3, 0, 3]
console.log(shortestDistanceColor([1,2], [[0,3]])); //[-1]


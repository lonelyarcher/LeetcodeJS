/* Given a rectangle of size n x m, find the minimum number of integer-sided squares that tile the rectangle.

Input: n = 2, m = 3
Output: 3
Explanation: 3 squares are necessary to cover the rectangle.
2 (squares of 1x1)
1 (square of 2x2)


/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
//DP, it is not fewest, but it is simplified, can create the upper bound for dfs search
//f(m, n) = 1 + f(m - n, n) if m > n
//so the maximum square will be when the maximum difference of m and n, so one of it will be 1, so upper bound could be max(m, n)
//Memoization Search, from the rectangle's bottom to build a skyline with add squares, try all possible size.
//when add the square, always begin at the lowest and left space
//bottom array, like skyline, 
//time O(m^n)
var tilingRectangle = function(n, m) {
    if (m > n) return tilingRectangle(m, n);//keep m is smaller one
    if (n === m) return 1;
    let min = Math.max(m, n); //the upper bound is max(m, n)
    const mem = {};
    const dfs = (arr, num) => {//arr is height array of base cells
        if (num >= min) return;
        if (arr.every(a => a === n)) {//if every cell height reach n, finished filling, update global min as result
            min = num;
            return;
        }
        const k = arr.reduce((a, c) => a * m + c); //hash of arr as the key of state map
        if (mem[k] !== undefined && num >= mem[k]) return;//if not good as in mem cache, stop the search.
        mem[k] = num;//keep updating the cache of minimum squares to reach this state
        const minH = Math.min(...arr), idx = arr.indexOf(minH);
        let maxLen = 1; //maxLength of new adding square can go
        while (idx + maxLen - 1 < m && arr[idx + maxLen - 1] === minH && minH + maxLen <= n) maxLen++; //while keep the same base line height, this square can't exceed the m and n
        for (let len = maxLen - 1; len > 0; len--) { //try all possible size of new square length, from max to min, because if max succeeds, min will be skip
            for (let j = idx; j < idx + len; j++) arr[j] += len;
            dfs(arr, num + 1);
            for (let j = idx; j < idx + len; j++) arr[j] -= len;//back track
        }
    }
    dfs(Array(m).fill(0), 0);
    return min;
};



console.log(tilingRectangle(2, 3)); //3
console.log(tilingRectangle(5, 8)); //5
console.log(tilingRectangle(11, 13)); //6
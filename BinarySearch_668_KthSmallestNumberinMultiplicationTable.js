/* Nearly every one have used the Multiplication Table. But could you find out the k-th smallest number quickly from the multiplication table?

Given the height m and the length n of a m * n Multiplication Table, and a positive integer k, you need to return the k-th smallest number in this table.

Example 1:
Input: m = 3, n = 3, k = 5
Output: 
Explanation: 
The Multiplication Table:
1	2	3
2	4	6
3	6	9

The 5-th smallest number is 3 (1, 2, 2, 3, 3).
Example 2:
Input: m = 2, n = 3, k = 6
Output: 
Explanation: 
The Multiplication Table:
1	2	3
2	4	6

The 6-th smallest number is 6 (1, 2, 2, 3, 4, 6).
Note:
The m and n will be in the range [1, 30000].
The k will be in the range [1, m * n] */

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

var findKthNumber = function(m, n, k) {
    const getNumOfLE = x => {
        let ans = 0;
        for (let i = 1; i <= m; i++) {
            ans += Math.min(n, parseInt(x/i)); //every row, find the num of which is small or equals to x, add it to the ans
            //for the rows are from [1,2,3,..., n] , [1*2, 2*2,...,n*2], ...[1*i, 2*i, ...,x, ..., n*i], so the num will be x/i is LE to x.
        }
        return ans;
    };
//find the smallest of value, which satisfy getNumOfLE(value) >= k, because it is the smallest, so it must appear in matrix.
    let l = 1, r = m * n + 1;
    while (l < r) {
        const mid = parseInt((l + r) / 2);
        const le = getNumOfLE(mid);
        if (le >= k) r = mid;
        else l = mid + 1;
    }
    return l; 
};

console.log(findKthNumber(3,3,5)); //3
console.log(findKthNumber(2, 3, 6)); //6
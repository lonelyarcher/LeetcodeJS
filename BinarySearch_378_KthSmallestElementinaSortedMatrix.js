/* Given a n x n matrix where each of the rows and 
columns are sorted in ascending order, 
find the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, 
not the kth distinct element.

Note:
You may assume k is always valid, 1 ≤ k ≤ n2. */

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
//first GT
const insert_right = (arr, k) => { 
    let l = 0; r = arr.length;
    while(l < r) {
        const mid = Math.floor((l + r) / 2);
        if (arr[mid] > k) r = mid;
        else l = mid + 1;
    }
    return l;
};

var kthSmallest = function(matrix, k) {
    //less function, find out the number of elements in matrix which is less or equal to target
    const m = matrix.length, n = (matrix[0] || []).length; 
    
    const less = target => { //Binary Search, time complexity: O(m*logn)
        let count = 0;
        for (let i = 0; i < m; i++) {
            count += insert_right(matrix[i], target);
        }
        return count;
    };

    const less = target => {//matrix sorted in both row and cols, time (m + n)
        let count = 0;
        for (let i = 0, j = n - 1; i < m; i++) {
            while (j >= 0 && matrix[i][j] > target) j--;
            count += j + 1;
            if (j < 0) break;
        }
        return count;
    };
    //find the smallest integer ans which less(ans) is greater than or equals to k
    let l = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER;
    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        if (less(mid) >= k) r = mid;
        else l = mid + 1;
    }
    return l;
};

console.log(kthSmallest([
    [ 1,  5,  9],
    [10, 11, 13],
    [12, 13, 15]
 ], 8)); //13

 console.log(kthSmallest([[-5]], 1)); //13

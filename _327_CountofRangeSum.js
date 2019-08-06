/* Given an integer array nums, return the number of range sums that lie in [lower, upper] inclusive.
Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j (i ≤ j), inclusive.

Note:
A naive algorithm of O(n2) is trivial. You MUST do better than that.


/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */

 //this problem is first presum, then follow the presum iterating sequence, 
 //keep sorting the previous presum elements
 //and use binary search to find the value range before the selected element of presum
 //time O(n*logn), space O(n)
const findFirstPosGE = (arr, target) => {
    let l = 0, r = arr.length - 1;
    while (l + 1 < r) {
        const mid = l + (r - l)/2;
        if (arr[mid] >= target){
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l >= target ? l : (r >= target ? r : arr.length);
};
const findLastPosLT = (arr, target) => {
    let l = 0, r = arr.length - 1;
    while (l + 1 < r) {
        const mid = l + (r - l)/2;
        if (arr[mid] < target){
            l = mid;
        } else {
            r = mid - 1;
        }
        return arr[r] < target ? r : (arr[l] < target ? l : -1);
    }
    if (l >= target) return l;
    else if (r >= target) return r;
    else return arr.length;
};

 var countRangeSum = function(nums, lower, upper) {
    const presum = nums.reduce((a, c) => {a.push(a[a.length - 1] + c); return a}, []);
    let ans = 0; cursum = [0];
    presum.forEach((s) => {
        const left = findFirstPosGE(cursum, s - upper);
        const right = findLastPosLT(cursum, s - lower);
        ans += right - left;
        const insert = findLastPosLT(cursum, s);
        cursum.splice(insert, 0, s);
    });
    return ans;
};


const nums = [-2,5,-1], lower = -2, upper = 2;
console.log(countRangeSum(nums, lower, upper)); //Output: 3 
//The three ranges are : [0,0], [2,2], [0,2] and their respective sums are: -2, -1, 2. */


//bucket sorting in previous presum elements, use js {} to check the k 
//from presum[i] + lower <= presum[j] <= presum[i] + upper,  j < i, 
//if any k satisfy presum[k] exists, then ans++;
//time O(n*(upper - lower)), space O(n)
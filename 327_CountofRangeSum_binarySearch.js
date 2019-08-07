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
 //  ...presum[i] - upper, ..., presum[i] - lower, ... presum[i]
const findFirstPosGE = (arr, target) => { //find first larger or equal means inserting position, if all the elements less than target, insert at the end of array which is arr.length
    if (!arr.length) return 0;
    let l = 0, r = arr.length - 1;
    while (l + 1 < r) {
        const mid = parseInt(l + (r - l)/2, 10);// mistake, forget parseInt, in js dividing will generate floating number not integer.
        if (arr[mid] >= target){
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return arr[l] >= target ? l : (arr[r] >= target ? r : arr.length); //mistake, don't mix the array element and array index, here is element value >= target not index
};
const findLastPosLE = (arr, target) => { //find last small or equal, if all the elments greater than target, which means position will be front of array -1;
    if (!arr.length) return -1; //binary search need to check the array is empty or not, otherwise r = -1;
    let l = 0, r = arr.length - 1;
    while (l + 1 < r) {
        const mid = parseInt(l + (r - l)/2, 10); // mistake, forget parseInt, in js dividing will generate floating number not integer.
        if (arr[mid] <= target){
            l = mid;
        } else {
            r = mid - 1;
        }
    }
    return arr[r] <= target ? r : (arr[l] <= target ? l : -1);
};

 var countRangeSum_binarysearch = function(nums, lower, upper) {
    const presum = nums.reduce((a, c) => {a.push(a[a.length - 1] + c); return a}, [0]);
    console.log(presum.join());
    let ans = 0; cursum = [];
    for (let s of presum) {
        const left = findFirstPosGE(cursum, s - upper);
        const right = findLastPosLE(cursum, s - lower);
        ans += right < left ? 0 : right - left + 1;
        const insert = findFirstPosGE(cursum, s);
        cursum.splice(insert, 0, s); //insert into array, splice if first argument is >= length , then it will be length. 
        //If negative number, then count backward from length, if < -length, then use 0 beginning position.
    };
    return ans;
};




//bucket sorting in previous presum elements, use js {} to check the k 
//from presum[i] + lower <= presum[j] <= presum[i] + upper,  j < i, 
//if any k satisfy presum[k] exists, then ans++;
//time O(n*(upper - lower)), space O(n)


var countRangeSum = function(nums, lower, upper) {
    const presum = nums.reduce((a, c) => {a.push(a[a.length - 1] + c); return a}, [0]);
    let ans = 0; cursum = {};
    for (let s of presum) {
        for (let i = s - upper; i <= s - lower; i++) {
            if (cursum[i]) ans += cursum[i];
        }
        cursum[s] = (cursum[s] || 0) + 1;
    };
    return ans;
};


console.log(countRangeSum([2147483647,-2147483648,-1,0], -1, 0)); //4
const nums = [-2,5,-1], lower = -2, upper = 2;
console.log(countRangeSum(nums, lower, upper)); //Output: 3 
//The three ranges are : [0,0], [2,2], [0,2] and their respective sums are: -2, -1, 2. */


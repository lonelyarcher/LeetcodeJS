/* Given two arrays of length m and n with digits 0-9 representing two numbers. 
Create the maximum number of length k <= m + n from digits of the two.
 The relative order of the digits from the same array must be preserved. Return an array of the k digits.

Note: You should try to optimize your time and space complexity.


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
var maxNumber_3D_DP = function(nums1, nums2, k) { //not good solution, time complexity: O(m*n*k*(m + n)), space complexity: m*n*k*(m + n)
    //first the max number which is before the can't-back-point (m + n - k), then do the left. Each step need O(n) to find max digit. 
    //The problem is that there is two array.
    //if you find max1 in arr1 and max2 in arr2, but max1 == max2, then you need try both way and choose which is ultimate maxium in later.
    //using memorizing search to avoid repeated calculation from exponential time.
    const m = nums1.length, n = nums2.length;
    const memo = [...Array(m + 1)].map(() => [...Array(n + 1)].map(() => Array(k).fill(undefined)));
    const helper = (s1, s2, k) => {
        if (k === 0) return [];
        if (memo[s1][s2][k]) return memo[s1][s2][k];
        let max1 = s1, max2 = s2;
        for (let i = s1; i < Math.min(m, m - s1 + n - s2 - k + 1); i++) {
            if (nums1[i] > nums1[max1]) max1 = i;
        }
        for (let i = s2; i < Math.min(n, m - s1 + n - s2 - k + 1); i++) {
            if (nums2[i] > nums2[max2]) max2 = i;
        }
        if (nums2[max2] === undefined || nums1[max1] > nums2[max2]) {
            memo[s1][s2][k] = [nums1[max1], ...helper(max1 + 1, s2, k - 1)];
        } else if (nums1[max1] === undefined || nums1[max1] < nums2[max2]) {
            memo[s1][s2][k] = [nums2[max2], ...helper(s1, max2 + 1, k - 1)];
        } else {
            const ans1 = [nums1[max1], ...helper(max1 + 1, s2, k - 1)];
            const ans2 = [nums2[max2], ...helper(s1, max2 + 1, k - 1)];
            for (let i = 0; i < k; i++) {
                if (ans1[i] > ans2[i]) memo[s1][s2][k] =  ans1;
                if (ans1[i] < ans2[i]) memo[s1][s2][k] =  ans2;
            }
            memo[s1][s2][k] =  ans1;
        }
        return memo[s1][s2][k];
    }
    return helper(0, 0, k);
};

var maxNumber = function(nums1, nums2, k) { //try to divide k length to two part by a split point as i: k - i and i
    //so problem will be divided to two sub question and merge two part together. 
    //sub question is find maximum k digit number in one array, which can use a monotonic stack to find max number
    //merge is easy to pick the larger number from two max number to one. 
    const m = nums1.length, n = nums2.length;
    let ans;
    const maxArray= (arr, k) => { //monotonic increasing stack, always put index into the stack
        const st = [];
        arr.forEach((v, i) => {
            while (st.length && v > arr[st[st.length - 1]] && arr.length - 1 - i + st.length >= k) st.pop();  
            // alway first do pop out operation and then push into stack.
            // if stack not empty 
            //and new item is larger than the top of stack value 
            //and the left items (arr.length - 1 - i) plus item in stack (st.length) are enough (>=) for required length k.
            st.push(i);
        });
        return st.slice(0, k).map(v => arr[v]);
    };
    const merge = (a1, a2) => {
        const ans = [];
        while(a1.length || a2.length) { 
            ans.push(larger(a1, a2)? a1.shift() : a2.shift()); 
            //which arr is larger, put which one. if tie then compare next one, which is include in functin larger. empty arr is always small than arr has number.
        }
        return ans;
    };
    const larger = (a1, a2) => {
        for (let i = 0; i < Math.min(a1.length, a2.length); i++) {
            if (a1[i] > a2[i]) return true;
            if (a1[i] < a2[i]) return false;
        }
        return a1.length >= a2.length;
    };
    for (let i = Math.max(0, k - n); i <= Math.min(m, k); i++) { //divide to 2 parts, but there is condition for dividing
        const max1 = maxArray(nums1, i);
        const max2 = maxArray(nums2, k - i);
        const max = merge(max1, max2);
        ans = !ans ? max : (larger(ans, max) ? ans : max);
    }
    return ans;
};


console.log(maxNumber([6,7], [6,0,4], 5)) //[6,7,6,0,4]
console.log(maxNumber([2,5,6,4,4,0], [7,3,8,0,6,5,7,6,2], 15)); //[7,3,8,2,5,6,4,4,0,6,5,7,6,2,0]
console.log(maxNumber([1,7,5], [8,6,9], 3)); //[9,7,5]
console.log(maxNumber([3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5)); //[9, 8, 6, 5, 3]
console.log(maxNumber([6, 7], [6, 0, 4], 5)); //[6, 7, 6, 0, 4]
console.log(maxNumber([3, 9], [8, 9], 3)); //[9, 8, 9]
console.log(maxNumber([8, 9], [3, 9], 3)); //[9, 8, 9]
console.log(maxNumber([6,7,5],[4,8,1], 3)); //[8,7,5]


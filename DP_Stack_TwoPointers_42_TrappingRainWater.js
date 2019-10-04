/* Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.


The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

Example:

Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6 */

/**
 * @param {number[]} height
 * @return {number}
 */
//DP, time: O(n), three iterations, space: O(n)
var trap_dp = function(height) {
    const rMaxHeights = height.reduce((a, c) => {
        a.push(Math.max(a[a.length - 1], c)); 
        return a;
    },[0]);
    const lMaxHeights = height.reduceRight((a, c) => {
        a.unshift(Math.max(a[0], c)); 
        return a;
    },[0]);
    return height.reduce((a, c, i) => a + Math.max(0, Math.min(rMaxHeights[i], lMaxHeights[i + 1]) - c), 0);
};
//Monotonical stack, time: O(n), one iteration, space: O(n)
var trap_stack = function(height) {
    const st = [];
    let water = 0;
    for (let i = 0; i < height.length; i++) {
        while(st.length && height[i] > height[st[0]]) {//pop out all the idx which height is smaller than i
            const j = st.shift();//get the previous lower idx j
            if (st.length) {//if j is not left wall, it should trap water.
                //caculate, min of left wall(top of stack) and right wall (i) minus height of j
                //multiple the distance from j to top of stack exclusively: i - st[0] - 1
                water += (Math.min(height[st[0]], height[i]) - height[j]) * (i - st[0] - 1); 
            }
        }
        st.unshift(i);//otherwise, push into the stack, maintain monotonic decreasin stack
    }
    return water;
};
//two pointers from left and right, time O(n), one iteration,  space O(0)
var trap_twopointers = function(height) {
    let l = 0, lh = 0, r = height.length - 1, rh = 0, water = 0;
    while (l <= r) {//even l meets r, we still go further to calculate last cell
        const h = Math.min(lh, rh);
        lh = Math.max(height[l], lh);
        rh = Math.max(height[r], rh);
        if (lh < rh) {//which side is smaller, move it to find higher wall 
            water += Math.max(0, h - height[l]);//once moving, calculate this cell water
            l++;
        } else {
            water += Math.max(0, h - height[r]);
            r--;
        }  
    }
    return water;
};

console.log(trap_dp([0,1,0,2,1,0,1,3,2,1,2,1])); //6
console.log(trap_stack([0,1,0,2,1,0,1,3,2,1,2,1])); //6
console.log(trap_stack([4,2,0,3,2,5])); // 9
console.log(trap_twopointers([0,1,0,2,1,0,1,3,2,1,2,1])); //6
console.log(trap_twopointers([4,2,0,3,2,5])); // 9
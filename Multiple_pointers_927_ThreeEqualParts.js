/* Given an array A of 0s and 1s, divide the array into 3 non-empty parts such that all of these parts represent the same binary value.

If it is possible, return any [i, j] with i+1 < j, such that:

A[0], A[1], ..., A[i] is the first part;
A[i+1], A[i+2], ..., A[j-1] is the second part, and
A[j], A[j+1], ..., A[A.length - 1] is the third part.
All three parts have equal binary value.
If it is not possible, return [-1, -1].

Note that the entire part is used when considering what binary value it represents.  For example, [1,1,0] represents 6 in decimal, not 3.  Also, leading zeros are allowed, so [0,1,1] and [1,1] represent the same value.

 

Example 1:

Input: [1,0,1,0,1]
Output: [0,3]
Example 2:

Input: [1,1,0,1,1]
Output: [-1,-1]
 

Note:

3 <= A.length <= 30000
A[i] == 0 or A[i] == 1 */

/**
 * @param {number[]} A
 * @return {number[]}
 */
//count One, then set three pointers at each beginning of one in three part
//compare each part through three pointer, if all match, and last pointer reach the end
//return  the end of first two part as answer
var threeEqualParts = function(A) {
    const count1 = A.reduce((a, b) => a + b);
    if (count1 % 3 > 0) return [-1, -1]; //if ones couldn't be divided into three parts
    if (count1 === 0) return [0, 2];//special case for all zero
    let p = 0, s = 0;//pointer to find three beginning position
    let p1, p2, p3;//three pointers 
    const psum = ~~(count1 / 3);
    while (A[p] === 0) p++;
    p1 = p;//find first pointer
    while (s < psum) s += A[p++];
    while (A[p] === 0) p++;//pass the zero between
    p2 = p;
    s = 0;
    while (s < psum) s += A[p++];
    while (A[p] === 0) p++;
    p3 = p;
    const end1 = p2 - 1, end2 = p3 - 1, end3 = A.length - 1;
    while (p1 <= end1 && p2 <= end2 && p3 <= end3) {
        if (A[p1++] !== A[p2] || A[p2++] !== A[p3++]) return [-1, -1];
    }
    if (p3 <= end3) return [-1, -1];//if there is extra zero in part three, not valid
    return [p1 - 1, p2]
};

console.log(threeEqualParts([1,0,1,0,1])); //[0,3]


console.log(threeEqualParts([1,1,0,1,1])); //Output: [-1,-1]
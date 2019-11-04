/* You are given a string containing only 4 kinds of characters 'Q', 'W', 'E' and 'R'.

A string is said to be balanced if each of its characters appears n/4 times where n is the length of the string.

Return the minimum length of the substring that can be replaced with any other string of the same length to make the original string s balanced.

Return 0 if the string is already balanced.

 

Example 1:

Input: s = "QWER"
Output: 0
Explanation: s is already balanced.
Example 2:

Input: s = "QQWE"
Output: 1
Explanation: We need to replace a 'Q' to 'R', so that "RQWE" (or "QRWE") is balanced.
Example 3:

Input: s = "QQQW"
Output: 2
Explanation: We can replace the first "QQ" to "ER". 
Example 4:

Input: s = "QQQQ"
Output: 3
Explanation: We can replace the last 3 'Q' to make s = "QWER".
 

Constraints:

1 <= s.length <= 10^5
s.length is a multiple of 4
s contains only 'Q', 'W', 'E' and 'R'. */

/**
 * @param {string} s
 * @return {number}
 */
//sliding window is good to find minimum length of substring
//sliding window template, one while loop with left pointer and right pointers
//right pointer is in the first invalid position, will reach arr.length position at end, the left is the first valid position and will be inside the arr.
//if valid, update mini length with r - l, then move the left pointer.
//else move the right point

var balancedString = function(s) {
    const count = [...s].reduce((a, c) => {a[c] = (a[c] || 0) + 1; return a;}, {}); 
    let l = 0, r = 0, minLen = Infinity;
    const validate = () => !Object.values(count).some(n => n > s.length / 4);
    while (l < s.length && r <= s.length) { //at the end, right pointer will be at s.length position
        if (validate()) {
            minLen = Math.min(minLen, r - l);//r is first position in the right out of window, so window length will be r - l
            count[s.charAt(l++)]++;//update the map and move the left
        } else {
            count[s.charAt(r++)]--;//update the map and move the right
        }
    }
    return minLen;
};

console.log(balancedString("QWER"));//0
console.log(balancedString("QQWE"));//1
console.log(balancedString("QQQW"));//2
console.log(balancedString("QQQQ"));//3
console.log(balancedString("WWEQERQWQWWRWWERQWEQ")); //4
/* Given a string text, we are allowed to swap two of the characters in the string. Find the length of the longest substring with repeated characters.

 

Example 1:

Input: text = "ababa"
Output: 3
Explanation: We can swap the first 'b' with the last 'a', or the last 'b' with the first 'a'. Then, the longest repeated character substring is "aaa", which its length is 3.
Example 2:

Input: text = "aaabaaa"
Output: 6
Explanation: Swap 'b' with the last 'a' (or the first 'a'), and we get longest repeated character substring "aaaaaa", which its length is 6.
Example 3:

Input: text = "aaabbaaa"
Output: 4
Example 4:

Input: text = "aaaaa"
Output: 5
Explanation: No need to swap, longest repeated character substring is "aaaaa", length is 5.
Example 5:

Input: text = "abcdef"
Output: 1
 

Constraints:

1 <= text.length <= 20000
text consist of lowercase English characters only. */

/**
 * @param {string} text
 * @return {number}
 */
//3 pointers: i, j, k. primary point i point to the first idx of each repeat sequence, 
// j point the last idx of sequence, and k move the the next same character squence with has one char distance from [i, j)
// use the count of each character to decide whether there is still additional character to swap
// Time: O(n), Space: O(n) 
var maxRepOpt1 = function(text) {
    const count = [...text].reduce((a, c) => {a[c] = a[c] || 0; a[c]++; return a;}, {}); //count each char occupancy
    let ans = 0;
    let i = 0;
    while (i < text.length) {
        let j = i;
        const c = text.charAt(i);
        while (j < text.length && text.charAt(j) === c) j++;
        if (j - i < count[c]) { //if still has same chars before or after it
            let k = j + 1;
            while (k < text.length && text.charAt(k) === c && k - i < count[c]) k++;
            ans = Math.max(k - i, ans);
        } else ans = Math.max(j - i, ans);
        i = j;
    }
    return ans;
};

console.log(maxRepOpt1("ababa")); //3
console.log(maxRepOpt1("aaabaaa")); //6
console.log(maxRepOpt1("aaabbaaa")); //4
console.log(maxRepOpt1("aaaaa")); //5
console.log(maxRepOpt1("abcdef")); //1
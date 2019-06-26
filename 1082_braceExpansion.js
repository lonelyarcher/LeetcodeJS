/**
 * 1087. Brace Expansion
Medium

20

0

Favorite

Share
A string S represents a list of words.

Each letter in the word has 1 or more options.  If there is one option, the letter is represented as is.  If there is more than one option, then curly braces delimit the options.  For example, "{a,b,c}" represents options ["a", "b", "c"].

For example, "{a,b,c}d{e,f}" represents the list ["ade", "adf", "bde", "bdf", "cde", "cdf"].

Return all words that can be formed in this manner, in lexicographical order.

 

Example 1:

Input: "{a,b}c{d,e}f"
Output: ["acdf","acef","bcdf","bcef"]
Example 2:

Input: "abcd"
Output: ["abcd"]
 

Note:

1 <= S.length <= 50
There are no nested curly brackets.
All characters inside a pair of consecutive opening and ending curly brackets are different.
 */

 /**
 * @param {string} S
 * @return {string[]}
 */
var expand = function(S) {
     return S.split(/\{|\}/).filter(s => s.length > 0)
     .map(s => 
        s.split(',')).reduce((a, c) => [].concat(...a.map(ch1 => c.map(ch2 => ch1 + ch2)))
    ).sort();
};

console.info(expand("{a,b}c{d,e}f"));
console.info(expand("abcd"));
// arr.flat() = arr.reduce((a, c) => a.concat(c)) = [].concat(...arr)

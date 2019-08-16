/* Given two strings str1 and str2 of the same length, determine whether you can transform str1 into str2 by doing zero or more conversions.

In one conversion you can convert all occurrences of one character in str1 to any other lowercase English character.

Return true if and only if you can transform str1 into str2.

 

Example 1:

Input: str1 = "aabcc", str2 = "ccdee"
Output: true
Explanation: Convert 'c' to 'e' then 'b' to 'd' then 'a' to 'c'. Note that the order of conversions matter.
Example 2:

Input: str1 = "leetcode", str2 = "codeleet"
Output: false
Explanation: There is no way to transform str1 to str2.
 

Note:

1 <= str1.length == str2.length <= 10^4
Both str1 and str2 contain only lowercase English letters. */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */

//Model the problem as graph problem, add edge from one character in one string to another.
//if one character need to link to more than one characters (two out degrees), then fails, return false
//if the edge forms a linked list: a -> b, b -> c, it is fine, 
//we can switch from the end  b -> c first, otherwise if you switch a -> b, you will have both b in one end then fails.
//If a cycle, you need find a unused character to be temp transform to break the loop.
//a -> b, b -> a, you first change a -> c, it became a c -> b -> a, a linked list 
//if there is no spare character to break the cycle, return false
//If a -> a, self cycle, then a is a spare character. 

var canConvert = function(str1, str2) {
    if (str1.length !== str1.length) return false;
    const map = {}, parent = {}; 
    let hasCycle = false, hasSpare = false;
    for (let i = 0; i < str1.length; i++) {

        if (!map[str1.charAt(i)]) {
            map[str1.charAt(i)] = str2.charAt(i);
            if (str1.charAt(i) === str2.charAt(i)) hasSpare = true;
            parent[str2.charAt(i)] = 
        }
        else if (map[str1.charAt(i)] !== str2.charAt(i)) return false;
    } 
};

console.log(canConvert("aabcc", "ccdee")); //true
console.log(canConvert("leetcode", "codeleet")); //false
console.log(canConvert("ab", "ba")); //false

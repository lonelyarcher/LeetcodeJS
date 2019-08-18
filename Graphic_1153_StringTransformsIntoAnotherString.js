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
//If a cycle, you need find a unused character from str2 to be temp transform to break the loop.
//if str2 contains all the characters a - z, then you don't have spare one to break circle. return false.
//a -> b, b -> a, you first change a -> c, it became a c -> b -> a, a linked list 
//If a -> a, self cycle, it is fine, you don't need to handle it.

const hasCycle = (V, adj) => { //need use dfs to detect cycle in directed graph. time O(V+E) space O(V+E)
    const seen = {}; //record visited vertex/vertice
    const stack = {}; //record dfs recursion stack visited vertices
    const dfs = (v, seen, stack) => {
        if (stack[v]) return true; //if visited in current recursion, then it is a cycle, it need to check first before seen check
        if (seen[v]) return false; //if checked then continue to next vertex
        
        seen[v] = true; //visited globally
        stack[v] = true; //visited in stack
        if (dfs(adj[v], seen, stack)) return true;
        stack[v] = false; //backtrack
        return false;
    };
    for (let v of V) {
        if (dfs(v, seen, stack)) return true;
    }
    return false;
};

var canConvert = function(str1, str2) { //check if one char not point to two different char, and has spare char is enough
    //because if no spare char, which means all low case characters are present, and no cycle, which means two strings are identical.
    if (str1 === str2) return true;  //for the no spare and no cycle
    const adj = {}, V = new Set(); 
    for (let i = 0; i < str1.length; i++) {
        const a = str1.charAt(i), b = str2.charAt(i);
        V.add(a);
        V.add(b);
        if (!adj[a]) adj[a] = b;
        else if (adj[a] !== b) return false;
    }
    return new Set(Object.values(adj)).size < 26; //check the values of map, take unique value, if not cover a to z, return true.
};
console.log(canConvert("abcdefghijklmnopqrstuvwxyz", "bcdefghijklmnopqrstuvwxyza")); //false
console.log(canConvert("aabcc", "ccdee")); //true
console.log(canConvert("aaaa", "aaaa")); //true

console.log(canConvert("aabcc", "ccdee")); //true
console.log(canConvert("leetcode", "codeleet")); //false
console.log(canConvert("aabaa", "ccdee")); //false
console.log(canConvert("abcdefghijklmnopqrstuvwxyz", "bcdefghijklmnopqrstuvwxyzq")); //true
console.log(canConvert("abcdefghijklmnopqrstuvwxyz", "azbcdefghijklmnopqrstuvwxyz")); //true



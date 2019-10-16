/* Given a list of words, each word consists of English lowercase letters.

Let's say word1 is a predecessor of word2 if and only if we can add exactly one letter anywhere in word1 to make it equal to word2.  For example, "abc" is a predecessor of "abac".

A word chain is a sequence of words [word_1, word_2, ..., word_k] with k >= 1, where word_1 is a predecessor of word_2, word_2 is a predecessor of word_3, and so on.

Return the longest possible length of a word chain with words chosen from the given list of words.

 

Example 1:

Input: ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: one of the longest word chain is "a","ba","bda","bdca".
 

Note:

1 <= words.length <= 1000
1 <= words[i].length <= 16
words[i] only consists of English lowercase letters. */

/**
 * @param {string[]} words
 * @return {number}
 */
//dfs, group the word by lens, then caculate all the connection of one addition distance.
var longestStrChain = function(words) {
    const n = words.length;
    //put index in it, and add it into adj list later, all index, don't mix the index and elements.
    const lens = words.reduce((a, c, i) => {a[c.length - 1].push(i); return a;}, [...Array(16)].map(() => []));
    const adj = [...Array(n)].map(() => []);
    for (let i = 0; i < 15; i++) {
        for (let i1 of lens[i]) { //entrie, index first, value second
            for (let i2 of lens[i + 1]) {
                let count = 0, p1 = 0, p2 = 0;
                while (p1 < words[i1].length) {
                    if (words[i1].charAt(p1) !== words[i2].charAt(p2)) {
                        p2++; count++;
                        if (count > 1) break;
                    } else {
                        p1++, p2++;
                    }
                }
                if (count === 1 || (count === 0 && p2 === words[i2].length - 1)) adj[i1].push(i2);
            }
        }
    }
    const deep = Array(n).fill(undefined);
    const dfs = v => { //memoization
        if (deep[v] !== undefined) return deep[v];
        deep[v] = 1;
        for (let nei of adj[v]) {
            deep[v] = Math.max(deep[v], 1 + dfs(nei));
        }
        return deep[v];
    };
    for (let i = 0; i < n; i++) dfs(i);
    return Math.max(...deep);
};
//short solution, easy implements in a interview.
//greedy, sort by length, then predecessor of a word must appear before it.
//then dp to construct the chain ends with i, recursive formula: dp[w] = dp[pre] + 1;
//pre = w remove one of char, use a map {} to save the previous chain lengths.
var longestStrChain2 = function(words) {
    const dp = {};
    words.sort((a, b) => a.length - b.length);
    for (let word of words) {
        dp[word] = 1;
        for (let i = 0; i < word.length; i++) {
            const pre = word.slice(0, i) + word.slice(i + 1);
            if (dp[pre]) dp[word] = Math.max(dp[word], dp[pre] + 1);
        }
    }
    return Math.max(...Object.values(dp));
};
//quick solution, just use word to backward find its precessor without one char.

console.log(longestStrChain2(["ksqvsyq","ks","kss","czvh","zczpzvdhx","zczpzvh","zczpzvhx","zcpzvh","zczvh","gr","grukmj","ksqvsq","gruj","kssq","ksqsq","grukkmj","grukj","zczpzfvdhx","gru"])); //7
console.log(longestStrChain2(["a","b","ba","bca","bda","bdca"])); //Output: 4
/* Given many words, words[i] has weight i.

Design a class WordFilter that supports one function, WordFilter.f(String prefix, String suffix). 
It will return the word with given prefix and suffix with maximum weight. If no word exists, return -1.

Examples:

Input:
WordFilter(["apple"])
WordFilter.f("a", "e") // returns 0
WordFilter.f("b", "") // returns -1
 

Note:

words has length in range [1, 15000].
For each test case, up to words.length queries WordFilter.f may be made.
words[i] has length in range [1, 10].
prefix, suffix have lengths in range [0, 10].
words[i] and prefix, suffix queries consist of lowercase letters only. */

/**
 * @param {string[]} words
 */
const Node = function() {
    this.children = {};
    this.word = null;
};
var WordFilter = function(words) {
    this.root = new Node();
    root.word = words.length - 1;
    words.forEach((w, i) => {  //add all the suffix before prefix, join with '_', like apple => e_apple, le_apple, ple_apple, ..., each add to the trie node
        let nw = `_${w}`;
        for (let j = w.length; j >= 0; j--) {
            nw = w.slice(j) + nw; 
            let node = this.root;
            for (let c of nw) {
                node.children[c] = node.children[c] || new Node();
                node = node.children[c];
                node.word = i //every node go through will updat its word to new word, because the later word will have more weight which should replace previous word.
            }
        } 
    });
};

/** 
 * @param {string} prefix 
 * @param {string} suffix
 * @return {number}
 */
WordFilter.prototype.f = function(prefix, suffix) {
    let node = this.root;
    for (const c of `${suffix}_${prefix}`) { //query suffix_prefix, each node already record the highest weight on itself or itself sub nodes.
        node = node.children[c];
        if (!node) return -1;
    }
    return node.word;
};

/** 
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(prefix,suffix)
 */
var obj = new WordFilter(["apple"]);
console.log(obj.f("a", "e")); // returns 0
console.log(obj.f("b", "")); // returns -1
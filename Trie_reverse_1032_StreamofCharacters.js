/* Implement the StreamChecker class as follows:

StreamChecker(words): Constructor, init the data structure with the given words.
query(letter): returns true if and only if for some k >= 1, 
the last k characters queried (in order from oldest to newest, including this letter just queried) 
spell one of the words in the given list.
 

Example:

StreamChecker streamChecker = new StreamChecker(["cd","f","kl"]); // init the dictionary.
streamChecker.query('a');          // return false
streamChecker.query('b');          // return false
streamChecker.query('c');          // return false
streamChecker.query('d');          // return true, because 'cd' is in the wordlist
streamChecker.query('e');          // return false
streamChecker.query('f');          // return true, because 'f' is in the wordlist
streamChecker.query('g');          // return false
streamChecker.query('h');          // return false
streamChecker.query('i');          // return false
streamChecker.query('j');          // return false
streamChecker.query('k');          // return false
streamChecker.query('l');          // return true, because 'kl' is in the wordlist
 

Note:

1 <= words.length <= 2000
1 <= words[i].length <= 2000
Words will only consist of lowercase English letters.
Queries will only consist of lowercase English letters.
The number of queries is at most 40000. */

/**
 * @param {string[]} words
 */

const code = ch => ch.charCodeAt(0) - 'a'.charCodeAt(0);
const TNode = function() {
    this.isWord = false;
    this.children = [];
}

const add = (word, node) => {
    for (let i = word.length - 1; i >= 0; i--) {
        const c = code(word.charAt(i));
        node.children[c] = node.children[c] || new TNode;
        node = node.children[c];
    }
    node.isWord = true;
};

const query = (arr, node) => {
    for (let i = 0; i < 2000; i++) {
        if (!node.children[arr[i]]) return false;
        if (node.children[arr[i]].isWord) return true;
        node = node.children[arr[i]];
    }
    return false;
};

var StreamChecker = function(words) {
    this.st = [];
    this.root = new TNode();
    words.forEach(w => add(w, this.root));
};

/** 
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function(letter) {
    this.st.unshift(code(letter));
    if(this.st.length > 2000) this.st.pop();
    console.log(query(this.st, this.root));
    return query(this.st, this.root);
};

/** 
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */

const streamChecker = new StreamChecker(["cd","f","kl"]); // init the dictionary.
streamChecker.query('a');          // return false
streamChecker.query('b');          // return false
streamChecker.query('c');          // return false
streamChecker.query('d');          // return true, because 'cd' is in the wordlist
streamChecker.query('e');          // return false
streamChecker.query('f');          // return true, because 'f' is in the wordlist
streamChecker.query('g');          // return false
streamChecker.query('h');          // return false
streamChecker.query('i');          // return false
streamChecker.query('j');          // return false
streamChecker.query('k');          // return false
streamChecker.query('l');          // return true, because 'kl' is in the wordlist
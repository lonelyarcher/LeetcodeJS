/* Given a 2D board and a list of words from the dictionary, find all words in the board.
Each word must be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
For example,
Given words = ["oath","pea","eat","rain"] and board =
[
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
]
Return ["eat","oath"].
Note:
You may assume that all inputs are consist of lowercase letters a-z.
click to show hint.
You would need to optimize your backtracking to pass the larger test. Could you stop backtracking earlier?
If the current candidate does not exist in all words' prefix, you could stop backtracking immediately. What kind of data structure could answer such query efficiently? Does a hash table work? Why or why not? How about a Trie? If you would like to learn how to implement a basic trie, please work on this problem: Implement Trie (Prefix Tree) first.
 */


const findWords = (board, words) => {
    const TNode = function() {
        this.children = {};
        this.Word = null;
    }
    const root = new TNode();
    words.forEach(w => {
        let node = root;
        for (let c of w) {
            node.children[c] = node.children[c] || new TNode();
            node = node.children[c]; //trie recursion 
        }
        node.word = w;
    });
    const ans = [], m = board.length, n = (board[0] || []).length;
    const visited = [...Array(m)].map(() => Array(n).fill(false));
    const dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const dfs = (i, j, node) => {
        if (i < 0 || i >= m || j < 0 || j >= n || visited[i][j]) return;
        visited[i][j] = true;
        const next = node.children[board[i][j]];
        if (next) {
            if (next.word) {
                ans.push(next.word);
                next.word = null; //avoid duplicate word, once we found a word, we remove it from trie.
            }
            for (let d of dir) {
                const ni = i + d[0], nj = j + d[1];
                dfs(ni, nj, next);
            }
        }
        visited[i][j] = false;
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, root);
        }
    }
    return ans;
}

let words = ["aba","baa","bab","aaab","aaa","aaaa","aaba"];
let board = [["a","b"],["a","a"]];

console.log(findWords(board, words)); // ["aba", "aaa", "aaab", "baa", "aaba"]
words = ["aba","baa","bab","aaab","aaa","aaaa","aaba"];
board = [];
console.log(findWords(board, words)); //[]
console.log(findWords([["a","a"]], ["a"])); //["a"]
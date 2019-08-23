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
    const dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const dfs = (i, j, node) => {
        const cur = board[i][j];
        const next = node.children[cur];
        board[i][j] = null;
        if (next) {
            if (next.word) {
                ans.push(next.word);
                next.word = null; //avoid duplicate word, once we found a word, we remove it from trie.
            }
            for (let d of dir) {
                const ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < n && nj >= 0 && nj < m && board[ni][nj] !== null) dfs(ni, nj, next);
            }
        }
        board[i][j] = cur;
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, root);
        }
    }
    return ans;
}

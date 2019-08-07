/* Think about Zuma Game. You have a row of balls on the table, colored red(R), yellow(Y), blue(B), green(G), and white(W). You also have several balls in your hand.

Each time, you may choose a ball in your hand, and insert it into the row (including the leftmost place and rightmost place). Then, if there is a group of 3 or more balls in the same color touching, remove these balls. Keep doing this until no more balls can be removed.

Find the minimal balls you have to insert to remove all the balls on the table. If you cannot remove all the balls, output -1.


Note:
You may assume that the initial row of balls on the table won’t have any 3 or more consecutive balls with the same color.
The number of balls on the table won't exceed 20, and the string represents these balls is called "board" in the input.
The number of balls in your hand won't exceed 5, and the string represents these balls is called "hand" in the input.
Both input strings will be non-empty and only contain characters 'R','Y','B','G','W'. */

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */

var findMinStep = function(board, hand) {
    let ans = Infinity;
    const len = hand.length;
    hand = [...hand].sort().join('');
    const dfs = (board, hand) => {
        if (!board.length) {
            ans = Math.min(ans, len - hand.length);
            return;
        }
        if (len - hand.length >= ans || !hand.length) return;
        [...board].forEach((c, i, arr) => {
            if (arr[i + 1] && c === arr[i + 1]) return;
            if (arr[i - 1] && c === arr[i - 1] && hand.includes(c)) {
                dfs(shrink(board.slice(0,i) + c + board.slice(i)), hand.replace(c, ''));
            } else if (c !== arr[i - 1] && hand.includes(c.repeat(2))) {
                dfs(shrink(board.slice(0,i) + c.repeat(2) + board.slice(i)), hand.replace(c.repeat(2), ''));
            }
        }); 
    }
    dfs(board, hand);
    return ans === Infinity ? -1 : ans;
};

const shrink = s => {
    while (/R{3,}|W{3,}|B{3,}|Y{3,}|G{3,}/.test(s)) s = s.replace(/R{3,}|W{3,}|B{3,}|Y{3,}|G{3,}/, '');
    return s;
}

console.log(findMinStep("WWRRBBWW", "WRBRW"));
//Output: 2
//Explanation: WWRRBBWW -> WWRR[R]BBWW -> WWBBWW -> WWBB[B]WW -> WWWW -> empty

console.log(findMinStep("WRRBBW", "RB"));//-1
//Output: -1
//Explanation: WRRBBW -> WRR[R]BBW -> WBBW -> WBB[B]W -> WW



console.log(findMinStep("G", "GGGGG"));
//Output: 2
//Explanation: G -> G[G] -> GG[G] -> empty 

console.log(findMinStep("RBYYBBRRB", "YRBGB"));
//Output: 3
//Explanation: RBYYBBRRB -> RBYY[Y]BBRRB -> RBBBRRB -> RRRB -> B -> B[B] -> BB[B] -> empty 

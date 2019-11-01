/* Given a binary tree, determine if it is a complete binary tree.

Definition of a complete binary tree from Wikipedia:
In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

 

Example 1:



Input: [1,2,3,4,5,6]
Output: true
Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6}) are as far left as possible.
Example 2:



Input: [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 isn't as far left as possible.
 
Note:

The tree will have between 1 and 100 nodes. */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
//level iteration, set nullFlag to fasle, 

//for each node, first check its left, then right.
//first check return false condition, hasNull true and Child not null
//then if child add into queue, if not set hasNull true.
//none happened to the end, return true
var isCompleteTree = function(root) {
    if (!root) return true;
    const queue = [root];
    let hasNull = false;
    while (queue.length) {
        const node = queue.pop();
        if (node.left && hasNull) return false;
        if (node.left) queue.unshift(node.left);
        else hasNull = true;
        if (node.right && hasNull) return false;
        if (node.right) queue.unshift(node.right);
        else hasNull = true;
    }
    return true;
};
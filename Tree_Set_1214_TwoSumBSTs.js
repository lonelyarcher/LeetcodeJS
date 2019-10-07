/* Given two binary search trees, return True if and only if there is a node in the first tree and a node in the second tree whose values sum up to a given integer target.

 

Example 1:



Input: root1 = [2,1,4], root2 = [1,0,3], target = 5
Output: true
Explanation: 2 and 3 sum up to 5.
Example 2:



Input: root1 = [0,-10,10], root2 = [5,1,7,0,2], target = 18
Output: false
 

Constraints:

Each tree has at most 5000 nodes.
-10^9 <= target, node.val <= 10^9 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @param {number} target
 * @return {boolean}
 */
//hashSet, O(n), if use BST to search all nodes in one tree, O(nlogn)
var twoSumBSTs = function(root1, root2, target) {
    const set1 = new Set();
    const preorderSet = root => {
        if (root) {
            set1.add(root.val);
            preorderSet(root.left);
            preorderSet(root.right);
        }
    }
    preorderSet(root1);
    const preorderSearch = (root) => {
        if(root) {
            if (set1.has(target - root.val)) return true;
            return preorderSearch(root.left) || preorderSearch(root.right);
        } else return false;
    }
    return preorderSearch(root2);
};
/* Given a binary tree, we install cameras on the nodes of the tree. 

Each camera at a node can monitor its parent, itself, and its immediate children.

Calculate the minimum number of cameras needed to monitor all nodes of the tree.

 

Example 1:


Input: [0,0,null,0,0]
Output: 1
Explanation: One camera is enough to monitor all nodes if placed as shown.
Example 2:


Input: [0,0,null,0,null,0,null,null,0]
Output: 2
Explanation: At least two cameras are needed to monitor all nodes of the tree. The above image shows one of the valid configurations of camera placement.

Note:

The number of nodes in the given tree will be in the range [1, 1000].
Every node has value 0. */


function TreeNode() {
    this.val = 0;
    this.left = this.right = null;
}


/**
 * @param {TreeNode} root
 * @return {number}
 */
//Greedy, bottom up by post-order traversal, O(n), 
//Treat null as covered. 
//If left/right uncovered, then set a camera on their parent
//Or if parent is null and current node is not covered, then add camera on it.
//dfs recursion with its parent.

var minCameraCover_bottom_up = function(root) {
    const covered = new Set([null]);
    const dfs = (node, parent) => {
        let ans = 0;
        if (!node) return 0;
        ans += dfs(node.left, node);
        ans += dfs(node.right, node);
        if (!covered.has(node.left) || !covered.has(node.right) || (!parent && !covered.has(node))) {
            ans++;
            covered.add(parent);
            covered.add(node);
        }
        return ans;
    }
    return dfs(root, null);
};

//DP, top down, O(n)
//return state: 0: uncovered, 1: covered but no camera, 2: has camera
var minCameraCover = function(root) {
    let ans = 0;
    const dfs = (root, parent) => {
        if (!root) return 1;
        const l = dfs(root.left, root);
        const r = dfs(root.right, root);
        if (l === 0 || r === 0 || (!parent && l !== 2 && r !== 2)) {
            ans++;
            return 2;
        }
        if (l === 1 && r === 1) return 0;
        return 1;
    }
    dfs(root, null);
    return ans;
};

//test
const root = new TreeNode();
const l = new TreeNode();
const ll = new TreeNode();
const lll = new TreeNode();
const lllr = new TreeNode();
root.left = l;
l.left = ll;
ll.left = lll;
lll.right = lllr;
console.log(minCameraCover_bottom_up(root)); //2
console.log(minCameraCover(root)); //2
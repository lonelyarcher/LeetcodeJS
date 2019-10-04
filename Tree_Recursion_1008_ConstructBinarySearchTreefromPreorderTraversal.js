/* Return the root node of a binary search tree 
that matches the given preorder traversal.

(Recall that a binary search tree is a binary tree 
    where for every node, any descendant of node.left has a value < node.val, 
    and any descendant of node.right has a value > node.val.  
    Also recall that a preorder traversal displays the value of the node first, 
    then traverses node.left, then traverses node.right.)

 

Example 1:

Input: [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]

 

Note: 

1 <= preorder.length <= 100
The values of preorder are distinct. */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
//recursion, narrow down the BST range, if out of range return null
//recursion will handle it back to its parent
var bstFromPreorder = function(preorder) {
    let i = 0;
    const construct = (l, r) => {
        if (i === preorder.length) return null;
        const val = preorder[i];
        if (val < l || val > r) return null; 
        const root = new TreeNode(val);
        i++;
        root.left = construct(l, root.val);
        root.right = construct(root.val, r);
        return root;
    };
    return construct(-Infinity, Infinity);
};

console.log(bstFromPreorder([8,5,1,7,10,12]).val); //

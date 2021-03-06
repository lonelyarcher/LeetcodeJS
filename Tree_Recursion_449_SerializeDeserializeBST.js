/* Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary search tree can be serialized to a string and this string can be deserialized to the original tree structure.

The encoded string should be as compact as possible.

Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless. */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    const ans = [];
    const preorder = root => {
        if (!root) return;
        ans.push(root.val);
        preorder(root.left);
        preorder(root.right);
    };
    preorder(root);
    return new Int16Array(ans);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (!data || !data.length) return null;
    let i = 0;
    const construct = (l, r) => {
        if (i === data.length) return null;
        const value = data[i];
        if (value < l || value > r) return null;
        const root = new TreeNode(value);
        i++;
        root.left = construct(l, value);
        root.right = construct(value, r);
        return root;
    };
    return construct(-Infinity, Infinity);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
const root = new TreeNode(2);
root.left = new TreeNode(1);
root.right = new TreeNode(3);
console.log(serialize(root).toString());
console.log(deserialize(serialize(root)));
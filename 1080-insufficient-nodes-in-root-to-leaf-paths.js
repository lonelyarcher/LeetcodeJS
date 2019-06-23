const TreeNode = function(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}



const array2Tree = arr => {
    const queue = [];
    if (!arr || !arr.length) return null;
    const root = new TreeNode(arr.shift());
    queue.push(root);
    while(queue.length) {
        const node = queue.shift();
        node.left = arr[0] ? new TreeNode(arr.shift()) : arr.shift();
        node.right = arr[0] ? new TreeNode(arr.shift()) : arr.shift();
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return root; 
}

const tree2Array = root => {
    if (!root) return [];
    const arr = [], queue = [root];
    while(queue.length) {
        const node = queue.shift();
        if (node) {
            arr.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            arr.push(null);
        }
    }
    return arr; 
}
/**
 * @param {TreeNode} root
 * @param {number} limit
 * @return {TreeNode}
 */
var sufficientSubset = function(root, limit) {
    if (!root) return null;
    if (!root.left && !root.right) {
        return root.val >= limit ? root : null;
    }
    root.right = sufficientSubset(root.right, limit - root.val);
    root.left = sufficientSubset(root.left, limit - root.val);
    return !root.left && !root.right ? null : root;
};

const arr1 = [1,2,3,4,-99,-99,7,8,9,-99,-99,12,13,-99,14];
const arr2 = [5,4,8,11,null,17,4,7,1,null,null,5,3];
const root = array2Tree(arr2);

console.info(tree2Array(root).join());
const newRoot = sufficientSubset(root, 1);
console.info(tree2Array(newRoot).join());
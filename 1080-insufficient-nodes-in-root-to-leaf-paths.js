const TreeNode = (val) => ({
    val,
    left: null,
    right: null,
});

const array2Tree = arr => {
    if (!arr.length) return null;
    const value = arr.shift();
    if(!value) return null;
    const root = TreeNode(value);
    root.left = array2Tree(arr);
    root.right = array2Tree(arr);
    return root;
}

const tree2Array = root => {
    if (!root) return [];
    const arr = [];
    arr.push(root.val);
    arr.concat(tree2Array(root.left));
    arr.concat(tree2Array(root.right));
    return arr;
}



/**
 * @param {TreeNode} root
 * @param {number} limit
 * @return {TreeNode}
 */
var sufficientSubset = function(root, limit) {
    if (!root) return root;
    const sum = dfs(root, limit);
    return sum >= limit ? root : null;
};

const dfs = (node, limit) => {
    let leftSum, rightSum, curSum;
    const hasLeft = (node.left !== null);
    const hasRight = (node.right !== null);
    
    if (hasLeft) {
        leftSum = dfs(node.left, limit - node.val);
        if (leftSum < limit - node.val) node.left = null;
    }
    
    if (hasRight) {
        rightSum = dfs(node.right, limit - node.val);
        if (rightSum < limit - node.val) node.right = null;
    }
    if (!hasLeft && hasRight) curSum = rightSum + node.val;
    if (!hasRight && hasLeft) curSum = leftSum + node.val;
    if (hasLeft && hasRight) curSum = Math.max(leftSum, rightSum) + node.val;
    if (!hasLeft && !hasRight) curSum = node.val;
    return curSum;
}


const root = array2Tree([5,4,8,11,null,17,4,7,1,null,null,5,3]);
console.info("tree2Array");
console.info(tree2Array(root));

const newRoot = sufficientSubset(root, 22);
//console.info(tree2Array(newRoot));
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

function inOrder(root) {// from root, go left, put root into stack. 
    //when left to the end, no root then pop stack
    const st = [], ans = [];
    while(root || st.length) {
        if (root) {
            st.unshift(root);
            root = root.left
        } else {
            const node = st.shift();
            ans.push(node.val);
            root = node.right;
        }
    }
    return ans;
}

function preOrder(root) { //from root, travel root, put right into stack. 
    //go left, when end pop the stack to right node.
    const st = [], ans = [];
    while (root || st.length) {
        if (root) {
            ans.push(root.val);
            st.unshift(root.right);
            root = root.left;
        } else {
            root = st.shift();
        }
    }
    return ans;
}

function postOrder(root) { 
    /* from root, go left, put the root into stack.
    keep record of last visit (in case don't repeat going right when root back from right)
    when left to end, peek the stack to go to its right if it has right and not visited ( right != pre) 
    if no right or already visit right, visit the root and record it as pre. */
    const st = []; ans = [];
    let pre;
    while (root || st.length) {
        if (root) {
            st.unshift(root);
            root = root.left;
        } else {
            if(st[0].right === null || st[0].right === pre) { //if node in the top of stack has no right or its right is visited, so we need visit this node.
                pre = st.shift();
                ans.push(pre.val);
            } else { //otherwise, which means the node in the top of stack has right and not visited, so we should go its right first.
                root = st[0].right;
            }
        }
    }
    return ans;
}

//test
const a = new TreeNode(1);
const b = new TreeNode(2);
const c = new TreeNode(3);
const d = new TreeNode(0);
const e = new TreeNode(2.5);
b.left = a;
b.right = c;
a.left = d;
c.left = e;

console.log(inOrder(b)); //[0, 1, 2, 2.5, 3]
console.log(preOrder(b)); //[2, 1, 0, 3, 2.5]
console.log(postOrder(b)); //[0, 1, 2.5, 3, 2]

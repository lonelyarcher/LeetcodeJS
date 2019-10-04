import java.util.ArrayList;
import java.util.List;

/* Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, 
or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize an N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. 
There is no restriction on how your serialization/deserialization algorithm should work. 
You just need to ensure that an N-ary tree can be serialized to a string and this string can be deserialized to the original tree structure.
For example, you may serialize the following 3-ary tree
 as [1 [3[5 6] 2 4]]. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

 Note:

N is in the range of [1, 1000]
Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless. */


// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val,List<Node> _children) {
        val = _val;
        children = _children;
    }
};

class Codec {

    // Encodes a tree to a single string.
    public String serialize(Node root) {
        if (root == null) return null;
        StringBuilder sb = new StringBuilder();
        sb.append(root.val + "(");
        if (root.children != null) {
            for (Node child : root.children) {
                sb.append(serialize(child));
            }
        }
        sb.append(")");
        return sb.toString();
    }


    // Decodes your encoded data to tree.

    public Node deserialize(String data) {
        if (data == null || data == "") return null;
        int[] idx = new int[1];
        idx[0] = 0;
        return parse(idx, data);
    }

    private Node parse(int[] idx, String data) {
        int pre = idx[0];
        if (idx[0] == data.length()) return null;
        while (data.charAt(idx[0]) != '(') idx[0]++;
        int val = Integer.parseInt(data.substring(pre, idx[0]));
        List<Node> children = new ArrayList<>();
        Node root = new Node(val, children);
        idx[0]++;
        while (data.charAt(idx[0]) != ')') {
            Node child = parse(idx, data);
            root.children.add(child);
        }
        idx[0]++;
        return root;
    }

    public static void main(String[] args) {
        
        Node root = new Node();
        root.val = 1;
        Node c1 = new Node();
        c1.val = 11;
        Node c2 = new Node();
        c2.val = 12;
        Node c3 = new Node();
        c3.val = 13;
        
        List<Node> children = new ArrayList<>();
        children.add(c1);
        children.add(c2);
        children.add(c3);
        root.children = children;

        List<Node> children1 = new ArrayList<>();
        List<Node> children2 = new ArrayList<>();
        c1.children = children1;
        c2.children = children2;

        Node gc11 = new Node();
        gc11.val = 111;
        children1.add(gc11);
        Node gc21 = new Node();
        gc21.val = 121;
        children2.add(gc21);
        Node gc22 = new Node();
        gc22.val = 122;
        children2.add(gc22);
        Node gc23 = new Node();
        gc23.val = 123;
        children2.add(gc23);

        Codec code = new Codec();
        String data = code.serialize(root);
        System.out.println(data);
        Node root2 = code.deserialize(data);
        System.out.println(root2.val);
        for(Node ch : root2.children) System.out.println(ch.val);

    }

}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));

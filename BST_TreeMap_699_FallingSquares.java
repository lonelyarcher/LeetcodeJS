import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.TreeMap;

/* On an infinite number line (x-axis), we drop given squares in the order they are given.

The i-th square dropped (positions[i] = (left, side_length)) is a square with the left-most point being positions[i][0] and sidelength positions[i][1].

The square is dropped with the bottom edge parallel to the number line, and from a higher height than all currently landed squares. We wait for each square to stick before dropping the next.

The squares are infinitely sticky on their bottom edge, and will remain fixed to any positive length surface they touch (either the number line or another square). Squares dropped adjacent to each other will not stick together prematurely.

 
Return a list ans of heights. Each height ans[i] represents the current highest height of any square we have dropped, after dropping squares represented by positions[0], positions[1], ..., positions[i].

Example 1:

Input: [[1, 2], [2, 3], [6, 1]]
Output: [2, 5, 5]
Explanation:
After the first drop of positions[0] = [1, 2]: _aa _aa ------- The maximum height of any square is 2.

After the second drop of positions[1] = [2, 3]: __aaa __aaa __aaa _aa__ _aa__ -------------- The maximum height of any square is 5. The larger square stays on top of the smaller square despite where its center of gravity is, because squares are infinitely sticky on their bottom edge.

After the third drop of positions[1] = [6, 1]: __aaa __aaa __aaa _aa _aa___a -------------- The maximum height of any square is still 5. Thus, we return an answer of [2, 5, 5].

 

 
Example 2:

Input: [[100, 100], [200, 100]]
Output: [100, 100]
Explanation: Adjacent squares don't get stuck prematurely - only their bottom edge can stick to surfaces.
 

Note:

1 <= positions.length <= 1000.
1 <= positions[i][0] <= 10^8.
1 <= positions[i][1] <= 10^6. */

class FallingSquares {//same as MyCalendarII, III, BST key is stare and end, value is the height after this key.
    public List<Integer> fallingSquares(int[][] positions) {
        TreeMap<Integer, Integer> bst = new TreeMap<>();
        List<Integer> ans = new ArrayList<Integer>();
        for (int i = 0; i < positions.length; i++) {
            int left = positions[i][0];
            int right = positions[i][0] + positions[i][1];
            int height = positions[i][1];
            Integer preLeft = bst.floorKey(left); //floorkey will include same existing key as new key
            Integer preRight = bst.floorKey(right);
            bst.put(left, preLeft != null ? bst.get(preLeft) : 0); //in case of the floorkey not exists
            bst.put (right, preRight != null ? bst.get(preRight) : 0);
            int maxHeight = 0;
            Iterator<Integer> iter = bst.subMap(left, right).keySet().iterator();//use iterator to avoiding the current modification error
            while (iter.hasNext()) {
               maxHeight = Math.max(maxHeight, bst.get(iter.next()) + height);
               iter.remove();//remove the coved the squares
            }
            bst.put(left, maxHeight);//set the new left to maxHeight
            ans.add(ans.isEmpty() ? maxHeight : Math.max(ans.get(ans.size() - 1), maxHeight));
        }
        return ans;
    }
    public static void main(String[] args) {
        FallingSquares so = new FallingSquares();
        System.out.println(so.fallingSquares(new int[][]{{9, 7}, {1, 9}, {3, 1}}).toString()); //[7, 16, 17]
        System.out.println(so.fallingSquares(new int[][]{{1, 2}, {2, 3}, {6, 1}}).toString()); //[2, 5, 5]
        System.out.println(so.fallingSquares(new int[][]{{100, 100}, {200, 100}}).toString()); //[100, 100]
    }
}

/* You have some sticks with positive integer lengths.

You can connect any two sticks of lengths X and Y into one stick by paying a cost of X + Y.  You perform this action until there is one stick remaining.

Return the minimum cost of connecting all the given sticks into one stick in this way.

 

Example 1:

Input: sticks = [2,4,3]
Output: 14
Example 2:

Input: sticks = [1,8,3,5]
Output: 30
 

Constraints:

1 <= sticks.length <= 10^4
1 <= sticks[i] <= 10^4 */

import java.util.PriorityQueue;

class Solution {
    public int connectSticks(int[] sticks) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int s : sticks) {
            heap.offer(s);
        }
        int cost = 0;
        while (heap.size() >= 2) {
            int s1 = heap.poll();
            int s2 = heap.poll();
            cost += s1 + s2;
            heap.offer(s1 + s2);
        }
        return cost;
    }

    public static void main(String[] args) {
        Solution s = new Solution();
    	System.out.print(s.connectSticks(new int[]{1,2,3,5}));
	}
}
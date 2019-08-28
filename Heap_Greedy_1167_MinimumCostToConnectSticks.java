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
import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.TreeMap;


/* Suppose LeetCode will start its IPO soon. In order to sell a good price of 
its shares to Venture Capital, LeetCode would like to work on some projects 
to increase its capital before the IPO. Since it has limited resources, 
it can only finish at most k distinct projects before the IPO. 
Help LeetCode design the best way to maximize its total capital 
after finishing at most k distinct projects.

You are given several projects. For each project i, 
it has a pure profit Pi and a minimum capital of Ci 
is needed to start the corresponding project. 
Initially, you have W capital. When you finish a project, 
you will obtain its pure profit and the profit will be added to your total capital.

To sum up, pick a list of at most k distinct projects 
from given projects to maximize your final capital, 
and output your final maximized capital.

Example 1:
Input: k=2, W=0, Profits=[1,2,3], Capital=[0,1,1].

Output: 4

Explanation: Since your initial capital is 0, you can only start the project indexed 0.
             After finishing it you will obtain profit 1 and your capital becomes 1.
             With capital 1, you can either start the project indexed 1 or the project indexed 2.
             Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
             Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.
Note:
You may assume all numbers in the input are non-negative integers.
The length of Profits array and Capital array will not exceed 50,000.
The answer is guaranteed to fit in a 32-bit signed integer. */


class _502_IPO {
    public int findMaximizedCapital(int k, int W, int[] Profits, int[] Capital) {
        int n = Capital.length;
        int[][] c = new int[n][2];
        for (int i = 0; i < n; i++) {
            c[i] = new int[]{Capital[i], i};
        }
        Arrays.sort(c, (c1, c2) -> c1[0] - c2[0]);
        
        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> b - a);
        int ans = W, i = 0, count = 0;
        for (; i < n && c[i][0] <= W; i++) {
            heap.offer(Profits[c[i][1]]);
        }
        while(!heap.isEmpty()) {
            int newC = heap.poll();
            ans +=  newC;
            if (++count == k) return ans;
            for (; i < n && c[i][0] <= ans; i++) {
                heap.offer(Profits[c[i][1]]);
            }
            
        }
        return ans;
    }
    public static void main(String[] args) {
        _502_IPO ipo = new _502_IPO();
        System.out.println(ipo.findMaximizedCapital(2, 0, new int[]{1, 2, 3}, new int[]{0, 1, 1}));
        System.out.println(ipo.findMaximizedCapital(1, 2, new int[]{1,2,3}, new int[]{1,1,2}));
    }
}


import java.util.*;


/* On an N x N grid, each square grid[i][j] represents the elevation at that point (i,j).

Now rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distance in zero time. Of course, you must stay within the boundaries of the grid during your swim.

You start at the top left square (0, 0). What is the least time until you can reach the bottom right square (N-1, N-1)?

Example 1:

Input: [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.

You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.
Example 2:

Input: [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation:
 0  1  2  3  4
24 23 22 21  5
12 13 14 15 16
11 17 18 19 20
10  9  8  7  6

The final route is marked in bold.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
Note:

2 <= N <= 50.
grid[i][j] is a permutation of [0, ..., N*N - 1]. */

//Dijstra Algorithme, shortest path from one vertex in weighted edge graphic
//the max deepth in the path is weight, pick the min weighted path is the solution.





class SwimRisingWater {



//BFS, with the idea of Dijkstra, use a heap to determine which direction to go
//the cost is the maximum deepth we meet along th path.
//we always go with lowest cost until we reach reach n-1, n-1, return the ans as cost.
//convert i,j two dimension to one dimension k, i = k/n; j = k % n
//then heap we can only put k as id of cell.
    public int swimInWater(int[][] grid) {
        int N = grid.length;
        Set<Integer> seen = new HashSet<>();
        PriorityQueue<Integer> pq = new PriorityQueue<Integer>((k1, k2) ->
                grid[k1 / N][k1 % N] - grid[k2 / N][k2 % N]);
        pq.offer(0);
        int ans = 0;
        int[][] dir = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        while (!pq.isEmpty()) {
            int k = pq.poll();
            int r = k / N, c = k % N;
            ans = Math.max(ans, grid[r][c]); //keep the cost as the maximum depth along the road
            if (r == N-1 && c == N-1) return ans; //meet the destination

            for (int i = 0; i < 4; ++i) { //go 4
                int nr = r + dir[i][0], nc = c + dir[i][1];
                int nk = nr * N + nc;
                if (0 <= nr && nr < N && 0 <= nc && nc < N && !seen.contains(nk)) {
                    pq.offer(nk);
                    seen.add(nk);
                }
            }
        }

        throw null;
    }








    //Dijkstra solution, long code
    class Node {
        int id;
        int cost;
        Node(int id, int cost) {
            this.id = id;
            this.cost = cost;
        }
    }

    public int swimInWater2(int[][] grid) {
        int n = grid.length, N = n * n;
        //Dijkstra need 5 things: heap, settled, adj, dist, starting node
        PriorityQueue<Node> heap = new PriorityQueue<>((n1, n2) -> n1.cost - n2.cost);
        
        int[] dist = new int[N]; //all vertice distince from 0, v = i * n + j
        for (int i = 1; i < dist.length; i++) dist[i] = Integer.MAX_VALUE; 
        
        Set<Integer> settled = new HashSet<>();

        //adj(edges)
        int[][] dir = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        List<List<Node>> adj = new ArrayList<>(); //adjacent list
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int cur = i * n + j;
                adj.add(new ArrayList<Node>());
                for (int[] d : dir) {
                    int ni = i + d[0], nj = j + d[1];
                    if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
                        int next = ni * n + nj;
                        int cost = Math.max(grid[i][j], grid[ni][nj]);
                        adj.get(cur).add(new Node(next, cost));
                    }
                }
            }
        }
        //starting Node
        dist[0] = grid[0][0];
        Node start = new Node(0, dist[0]);
        heap.offer(start);
        
        while (settled.size() < N) { //once all the vertice is settled, done
            Node node = heap.poll();
            settled.add(node.id);//once if poll out from heap, which mean it is shortest path, then set it settled, no need to evaluate again.
            for (Node next : adj.get(node.id)) {
                if (!settled.contains(next.id)) {
                    if (Math.max(dist[node.id], next.cost) < dist[next.id]) { //if find shorter path, then update dist[] and put it into the heap
                        dist[next.id] = Math.max(dist[node.id], next.cost);
                    }
                    heap.offer(next);
                }
            }
        }
        return dist[N - 1];
    }
    public static void main(String[] args) {
        SwimRisingWater s = new SwimRisingWater();
        System.out.println(s.swimInWater(new int[][]{{0,2},{1,3}}));
        System.out.println(s.swimInWater(new int[][]{{0,1,2,3,4}, {24,23,22,21,5}, {12,13,14,15,16}, {11,17,18,19,20}, {10,9,8,7,6}}));
    }
}

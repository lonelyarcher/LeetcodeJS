
import java.util.HashSet;
import java.util.PriorityQueue;
import java.util.Set;



class WaterDistribution {
    class Node {
        String type;
        Integer house1;
        Integer house2;
        int cost;
        public Node(String type, Integer house1, Integer house2, Integer cost) {
            this.type = type;
            this.house1 = house1;
            this.house2 = house2;
            this.cost = cost;
        }
    }
    
    int[] parent;
    Set<Integer> supplied;
    
    public int find(int i) {
        if (parent[i] != i) parent[i] = find(parent[i]);
        return parent[i];
    }
    
    public void union(int i, int j) {
        int pi = find(i);
        int pj = find(j);
        if (supplied.contains(pi)) {
            parent[pj] = pi;
        } else {
            parent[pi] = pj;
        }
    }
    
    public int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {
        PriorityQueue<Node> heap = new PriorityQueue<>((n1, n2) -> n1.cost - n2.cost); 
        
        parent = new int[wells.length + 1];
        for (int i = 0; i < wells.length; i++) {
            heap.offer(new Node("well", i + 1, null, wells[i]));
            parent[i + 1] = i + 1;
        }
        for (int[] pipe : pipes) {
            heap.offer(new Node("pipe", pipe[0], pipe[1], pipe[2]));
        }
        int cost = 0;
        supplied = new HashSet<>();
        while (!heap.isEmpty()) {
            Node node = heap.poll();
            
            if (node.type.equals("well")) {
                if (supplied.contains(find(node.house1))) continue;
                cost += node.cost;
                supplied.add(find(node.house1));
            } else {
                if (supplied.contains(find(node.house1)) && supplied.contains(find(node.house2))) continue;
                if (find(node.house1) == find(node.house2)) continue;
                union(node.house1, node.house2);
                cost += node.cost;
            }
        }
        return cost;
    }
    
    public static void main(String[] args) {
    	WaterDistribution solution = new WaterDistribution();
    	int[] wells = {1, 2, 2};
    	int[][] pipes = {{1,2,1}, {2,3,1}};
		System.out.print(solution.minCostToSupplyWater(3, wells, pipes));
	}
}
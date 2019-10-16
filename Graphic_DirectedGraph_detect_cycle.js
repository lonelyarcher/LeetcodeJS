/* given: a > b, b > c, a > c, verify them, return true if all are valid
You can create a graph of adj list [[b, c], [c], []], and detect if it has cycle or not. has cycle return false, otherwise return true.

1. follow up: if some variable change to number, like a > 2, b < 1, a > b. 
you can add more edges like 2 > 1, then treat number 2, 1 as a node, do the same cycle detection.

2. follow up: if you have =, like a >= b, b < a, return false, a >= b, b >= c, c >= a return true.
solution create another graph for =, it is undirected, to check they are connected or not, 
when you have >=, you need to check both in directed for cycle and undirected for connection. If connected for = is true, otherwise return false, 
you can use UnionFind. */

const graph = [[1], [2], [0]]; //adjacent list
const detectCycle = graph => {
    const N = graph.length;
    const seen = Array(N).fill(false);
    const rec_st = Array(N).fill(false);
    const dfs = v => {
        if (rec_st[v]) return true; //when cycled find, rec to existing node in both visited and rec_st.
        //you need first check rec_st, otherwise visited will ignore rec_st and return no cycle since it is already visited
        if (seen[v]) return false;
        seen[v] = true;
        rec_st[v] = true;
        for (let nei of graph[v]) {
            if (dfs(nei)) return true;
        }
        rec_st[v] = false;
        return false;
    };
    for (let v = 0; v < N; v++) {
        if (dfs(v)) return true;
    }
    return false;
};
console.log(detectCycle(graph));
console.log(detectCycle([[1, 2], [2], []]));



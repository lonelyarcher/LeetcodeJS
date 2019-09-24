/* There are n items each belonging to zero or one of m groups where group[i] is the group that the i-th item belongs to 
and it's equal to -1 if the i-th item belongs to no group. The items and the groups are zero indexed. A group can have no item belonging to it.

Return a sorted list of the items such that:

The items that belong to the same group are next to each other in the sorted list.
There are some relations between these items where beforeItems[i] is a list containing all the items 
that should come before the i-th item in the sorted array (to the left of the i-th item).
Return any solution if there is more than one solution and return an empty list if there is no solution.

Constraints:

1 <= m <= n <= 3*10^4
group.length == beforeItems.length == n
-1 <= group[i] <= m-1
0 <= beforeItems[i].length <= n-1
0 <= beforeItems[i][j] <= n-1
i != beforeItems[i][j]
beforeItems[i] does not contain duplicates elements. */

/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
//topological sort, first sort on groups, then sort on each group
//1. first construct the topological function
//2. grouping, make group graphic, then sort it
//3. sort each group, and flat the sorted groups to get the answer

var sortItems = function(n, m, group, beforeItems) {
    
    //topologic sort need: vertices N, directed edge adj lists [[]]
    const toposort = (N, edges) => {
        const ans = [];
        const indegree = Array(N).fill(0);
        const adj = [...Array(N)].map(() => []);
        for (let [pre, next] of edges) {
            indegree[next]++;
            adj[pre].push(next);
        }
        const queue = indegree.filter(i => i === 0).map((c, i) => i);
        while (queue.length) {
            const n = queue.shift();
            ans.push(n);
            for (let post of adj[n]) {
                indegree[post]--;
                if (indegree[post] === 0) queue.push(post);
            }
        }
        return ans.length === N ? ans : [];
    };

    //group the items
    const map = {};
    const groups = group.reduce((a, c, i) => {
        if (c === -1) {
            a.push([i]);
            map[i] = a.length - 1;
        } else {
            a[c] = a[c] || [];
            a[c].push(i);
        }
        return a;
    }, [...Array(m)].map(() => []));

    const getIdx = c => group[c] === -1 ? map[c] : group[c];
    const gEdges = [], iEdges = [];
    for (let [i, c] of beforeItems.entries()) {
        for (let pre of c) {
            if (group[pre] !== group[i]) {               
                gEdges.push([getIdx(pre), getIdx(i)]);
            } else {
                iEdges[group[pre]] = iEdges[group[pre]] || [];
                iEdges[group[pre]].push([pre, i]);
            }
        }
    }

    const sortedGroups = toposort(groups.length, gEdges);
    const ans = [];
    for (let i of sortedGroups) {
        const sorted = toposort(groups[i], iEdges[i]);
        ans = ans.concat(sorted);
    }
    return ans;
};

console.log(sortItems(n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]])); //[6,3,4,1,5,2,0,7]
console.log(sortItems(n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3],[],[4],[]])); //[]
/* Given a graph whose nodes are 3-letter words and an array of 3-letter words. Find a path in the graph such that the difference b/w words in the path and given array is minimum.

We are given 2 APIs which work for this graph:

class Graph {

	//Get all neighbors of a node.

	Set<String> getNeighbors(String node);

	//Get a list of all nodes in no particular order.
	Set<String> listAllNodes();
}
Consider a graph G:


Example 1:

Input: G, arr = [AAA, BBB, CCC, DDD]
Output: 2
Explanation: The path [AAA, BBC, CCD, DDD] is closest to given array.
In path, BBC differs from BBB by 1 and CCD differs from CCC by 1 hence answer is 1 + 1 = 2.
Example 2:

Input: G, arr = [AAA, CCC, AAA, BBD]
Output: 3
Explanation: The path [AAA, BBC, AAA, BBC] is closest to given array.
In path, BBC differs from CCC by 2 and BBC differs from BBD by 1 hence answer is 2 + 1 = 3.

Notice that we can visit the same node multiple times. */

const listAllNodes = () => [];
const getNeighbors = node => [];
const diff = (s1, s2) => {
	let ans = 0;
	for (let i = 0; i < 3; i++) {
		if (s1.charAt(i) !== s2.charAt(i)) ans++;
	}
	return ans;
};

const minDiff = arr => {
	const n = arr.length;
	const heap = new Heap((k1, k2) => diffs[~~k1/n][k1%n] - diffs[~~k2/n][k2%n];
	const diffs = [...Array(listAllNodes().length)].map(() => Array(arr.length).fill(Infinity));
	const seen = {};
	for (let [s, i] of listAllNodes().entries()) {
		heap.offer(i * arr.length + 0);
		seen[i * arr.length + 0] = true;
		diffs[i][0] = diff(s, arr[0]);
	}
	
	while(!heap.length){
		const k = heap.poll();
		const [i, j] = [~~k/n, k%n];
		if (j === arr.length - 1) return diffs[i][j];
		for (let [next, ni] of getNeighbors(node).entries()) {
			diffs[ni][j+1] = Math.min(diffs[ni][j + 1], diffs[i][j] + diff(next, arr[j + 1]));
			if (!seen[ni*n+j+1]) heap.offer(ni*n+j+1);
			seen[ni*n+j+1] = true;
		}
	}
	return null;
};

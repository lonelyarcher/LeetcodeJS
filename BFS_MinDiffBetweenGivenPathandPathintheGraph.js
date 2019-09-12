/* Given a graph whose nodes are 3-letter words and an array of 3-letter words. Find a path in the graph such that the difference b/w words in the path and given array is minimum.

We are given 2 APIs which work for this graph:

class Graph {
	/**
	* Get all neighbors of a node.
	*/
	Set<String> getNeighbors(String node);

	/**
	* Get a list of all nodes in no particular order.
	*/
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

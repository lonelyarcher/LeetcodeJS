/* Given a non-empty array of unique positive integers A, consider the following graph:

There are A.length nodes, labelled A[0] to A[A.length - 1];
There is an edge between A[i] and A[j] if and only if A[i] and A[j] share a common factor greater than 1.
Return the size of the largest connected component in the graph.

 

Example 1:

Input: [4,6,15,35]
Output: 4

Example 2:

Input: [20,50,9,63]
Output: 2

Example 3:

Input: [2,3,6,7,4,12,21,39]
Output: 8

Note:

1 <= A.length <= 20000
1 <= A[i] <= 100000 */

/**
 * @param {number[]} A
 * @return {number}
 */
//Sieve to generate all the prime number within N, upper bound: O(nlog(log(n))) = n * (1/2 + 1/3 + 1/5 + 1/7 + ...) 
const sieve = N => {
    const size = N //~~Math.sqrt(N) is not right here. Prime can be larger than sqrt(N), like 926 -> 463, 463 is prime number.
    const primes = Array(N).fill(true);
    primes[0] = primes[1] = false;
    let p = 2;
    while (p <= N) {
        if (primes[p]) {
            for (let i = 2 * p; i <= N; i += p) {
                primes[i] = false;
            }
        }
        p++;
    }
    return primes.map((c, i) => c ? i : 0).filter(p => p);
}
//Union Find to union to the prime factors
var largestComponentSize = function(A) {
    const primes = sieve(Math.max(...A));
    const parent = [...Array(primes.length + A.length)].map((c, i) => i); //because we will union num to its prime factor to avoid collision, we add A.length to all the prime index.
    const weight = Array(primes.length + A.length).fill(0);
    const find = v => {
        if (parent[v] !== v) {
            parent[v] = find(parent[v]);
        }
        return parent[v];
    };
    const union = (v1, v2) => {
        const p1 = find(v1);
        const p2 = find(v2);
        if (weight[p1] > weight[p2]) parent[p2] = p1;
        else if (weight[p1] < weight[p2]) parent[p1] = p2;
        else {
            parent[p2] = p1;
            weight[p1]++;
        }
    };
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < primes.length; j++) {
            if (A[i] % primes[j] === 0) union(i, j + A.length);
        }
    }
    const count = parent.slice(0, A.length).map(p => find(p)).reduce((a, c) => { a[c] = (a[c] || 0) + 1; return a; }, {});
    return Math.max(...Object.values(count));
};

console.log(largestComponentSize([2,7,522,526,535,26,944,35,519,45,48,567,266,68,74,591,81,86,602,93,610,621,111,114,629,641,131,651,142,659,669,161,674,163,180,187,190,194,195,206,207,218,737,229,240,757,770,260,778,270,272,785,274,290,291,292,296,810,816,314,829,833,841,349,880,369,147,897,387,390,905,405,406,407,414,416,417,425,938,429,432,926,959,960,449,963,966,929,457,463,981,985,79,487,1000,494,508]));//84
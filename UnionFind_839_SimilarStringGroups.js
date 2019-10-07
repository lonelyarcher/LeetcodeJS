/* Two strings X and Y are similar if we can swap two letters (in different positions) of X, 
so that it equals Y.

For example, "tars" and "rats" are similar (swapping at positions 0 and 2), 
and "rats" and "arts" are similar, but "star" is not similar to "tars", "rats", or "arts".

Together, these form two connected groups by similarity: 
{"tars", "rats", "arts"} and {"star"}.  
Notice that "tars" and "arts" are in the same group even though they are not similar.  
Formally, each group is such that 
a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list A of strings.  Every string in A is an anagram of every other string in A.  
How many groups are there?

Example 1:

Input: ["tars","rats","arts","star"]
Output: 2
Note:

A.length <= 2000
A[i].length <= 1000
A.length * A[i].length <= 20000
All words in A consist of lowercase letters only.
All words in A have the same length and are anagrams of each other.
The judging time limit has been increased for this question. */

/**
 * @param {string[]} A
 * @return {number}
 */
//Union Find O(N^2*W)
//find amortized time complexity: O(logN) 
//or with path compression and union by rank, O(inverse Ackermann function) ~ O(1)

class UF {
    constructor(n) {
        this.parents = [...Array(n)].map((c, i) => i);
        this.ranks = Array(n).fill(0);
    }

    find(i) {
        if (this.parents[i] !== i) {
            this.parents[i] = this.find(this.parents[i]); // path compression
        }
        return this.parents[i];
    }

    union(i, j) { //union by ranks to form more balanced tree;
        const pi = this.find(i);
        const pj = this.find(j);
        if (pi === pj) return;
        if (this.ranks[pi] < this.ranks[pj]) {
            this.parents[pi] = pj;
        } else if (this.ranks[pi] > this.ranks[pj]) {
            this.parents[pj] = pi;
        } else {
            this.parents[pi] = pj;
            this.ranks[pj] += 1;
        }
    }
};

var numSimilarGroups = function(A) {
    const N = A.length;
    const uf = new UF(N);
    const isSimilar = (a, b) => {
        const diff = [];
        for (let i = 0; i < a.length; i++) {
            if (a.charAt(i) !== b.charAt(i)) diff.push(i);
            if (diff.length > 2) return false;
        }
        return true;
    };
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            if (isSimilar(A[i], A[j])) {//O(length of word)
                uf.union(i, j);//constant time, O(1)
            }
        }
    }
    return new Set(uf.parents.map((c, i) => uf.find(i))).size;
};

//Another approach, O(NW^3) to construct the UF
//enumerate all possible neighbors of each word, O(NW^3)
var numSimilarGroups_enumerate = function(A) {
    const N = A.length;
    const uf = new UF(N);
    const wmap = A.reduce((a, c, i) => {a[c] = i; return a;}, {});
    for (let i = 0; i < N; i++) {//O(N*W^3)
        const arr = [...A[i]];
        for (let j = 0; j < A[i].length; j++) {//O(w)
            for (let k = j + 1; k < A[i].length; k++) {//O(w)
                const t = arr[j];
                arr[j] = arr[k];
                arr[k] = t;
                const w = arr.join('');//O(w)
                if (wmap[w]) {
                    uf.union(i, wmap[w])
                }
                arr[k] = arr[j];
                arr[j] = t; 
            }
        }
    }
    return new Set(uf.parents.map((c, i) => uf.find(i))).size;

}

console.log(numSimilarGroups(["tars","rats","arts","star"])); //Output: 2
console.log(numSimilarGroups_enumerate(["tars","rats","arts","star"])); //Output: 2
/* Given two sentences words1, words2 (each represented as an array of strings), and a list of similar word pairs pairs, determine if two sentences are similar.

For example, words1 = ["great", "acting", "skills"] and words2 = ["fine", "drama", "talent"] are similar, if the similar word pairs are pairs = [["great", "good"], ["fine", "good"], ["acting","drama"], ["skills","talent"]].

Note that the similarity relation is transitive. For example, if "great" and "good" are similar, and "fine" and "good" are similar, then "great" and "fine" are similar.

Similarity is also symmetric. For example, "great" and "fine" being similar is the same as "fine" and "great" being similar.

Also, a word is always similar with itself. For example, the sentences words1 = ["great"], words2 = ["great"], pairs = [] are similar, even though there are no specified similar word pairs.

Finally, sentences can only be similar if they have the same number of words. So a sentence like words1 = ["great"] can never be similar to words2 = ["doubleplus","good"].

Note:

The length of words1 and words2 will not exceed 1000.
The length of pairs will not exceed 2000.
The length of each pairs[i] will be 2.
The length of each words[i] and pairs[i][j] will be in the range [1, 20]. */

/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @param {string[][]} pairs
 * @return {boolean}
 */

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

var areSentencesSimilarTwo = function(words1, words2, pairs) {
    const uf = new UF(pairs.length * 2);
    const map = {};
    let i = 0;
    pairs.forEach(c => {
        map[c[0]] = map[c[0]] || i++;
        map[c[1]] = map[c[1]] || i++;
        uf.union(map[c[0]], map[c[1]]);
    });
    if (words1.length !== words2.length) return false;
    for (let j = 0; j < words1.length; j++) {
        if (uf.find(map[words1[j]]) !== uf.find(map[words2[j]])) return false;
    }
    return true;
};

let words1 = ["great", "acting", "skills"]; 
let words2 = ["fine", "drama", "talent"];
let pairs = [["great", "good"], ["fine", "good"], ["acting","drama"], ["skills","talent"]];

console.log(areSentencesSimilarTwo(words1, words2, pairs));
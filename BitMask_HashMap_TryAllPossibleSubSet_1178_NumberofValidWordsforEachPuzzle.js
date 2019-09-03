/* With respect to a given puzzle string, a word is valid if both the following conditions are satisfied:
word contains the first letter of puzzle.
For each letter in word, that letter is in puzzle.
For example, if the puzzle is "abcdefg", then valid words are "faced", "cabbage", and "baggage"; while invalid words are "beefed" (doesn't include "a") and "based" (includes "s" which isn't in the puzzle).
Return an array answer, where answer[i] is the number of words in the given word list words that are valid with respect to the puzzle puzzles[i].
 

Example :

Input: 
words = ["aaaa","asas","able","ability","actt","actor","access"], 
puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
Output: [1,1,3,2,4,0]
Explanation:
1 valid word for "aboveyz" : "aaaa" 
1 valid word for "abrodyz" : "aaaa"
3 valid words for "abslute" : "aaaa", "asas", "able"
2 valid words for "absoryz" : "aaaa", "asas"
4 valid words for "actresz" : "aaaa", "asas", "actt", "access"
There're no valid words for "gaswxyz" cause none of the words in the list contains letter 'g'.
 

Constraints:

1 <= words.length <= 10^5
4 <= words[i].length <= 50
1 <= puzzles.length <= 10^4
puzzles[i].length == 7
words[i][j], puzzles[i][j] are English lowercase letters.
Each puzzles[i] doesn't contain repeated characters. */

//first bit_mask is best for save state of each word/puzzle string's char Map, because we don't care how many time a char appear in a work.
//HashMap to save one mask has how many word in words, when puzzle has this key, then we add map[key] to this count.
//for puzzles[i].length == 7, and puzzles.length << words.length, so if when we compare each words map key to find matches, it takes long time.
//but if we think another way, try all possible subset of puzzle mask to find it in hashMap or not, we only spent 2^7 * O(1)-hashmap lookup time to complete one puzzle.
//so total will be puzzles.length & 2^6 = 64, because all 2^7 subset, it must have the first letter which must appear in word as description.

var findNumOfValidWords = function(words, puzzles) {
    const code = c => c.charCodeAt(0) - 'a'.charCodeAt(0);
    const wmap = words.map(w => [...w]
        .reduce((a, c) => a | (1 << code(c)), 0)) //build bitMask
        .reduce((a, c) => { //reduce to hashmap, key is mask and value is count
            a[c] = a[c] || 0;
            a[c]++;
            return a;
        }, {});
    return puzzles.map(p => {
        let count = 0;
        const subSet = [1 << code(p.charAt(0))];
        for (let i = 1; i < p.length; i++) {
            const newSet = [];
            for (let sub of subSet) {
                newSet.push(sub | (1 << code(p.charAt(i))));
            }
            subSet.push(...newSet);
        }

        /* const subSet = []; 
        const dfs = (path, i) => { //use recursion to build all subset
            if (i === p.length) subSet.push(path);
            else {
                dfs(path, i + 1);
                dfs(path | 1 << code(p.charAt(i)), i + 1);
            }
        };
        dfs(1 << code(p.charAt(0)), 1); */
        for (let sub of subSet) {
            if (wmap[sub]) count += wmap[sub];
        }
        return count;
    });
};

console.log(findNumOfValidWords(words = ["aaaa","asas","able","ability","actt","actor","access"], puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]));
//Output: [1,1,3,2,4,0]
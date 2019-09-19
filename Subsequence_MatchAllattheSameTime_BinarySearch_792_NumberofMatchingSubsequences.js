/* Given string S and a dictionary of words words, find the number of words[i] that is a subsequence of S.

Example :
Input: 
S = "abcde"
words = ["a", "bb", "acd", "ace"]
Output: 3
Explanation: There are three words in words that are a subsequence of S: "a", "acd", "ace".
Note:

All words in words and S will only consists of lowercase letters.
The length of S will be in the range of [1, 50000].
The length of words will be in the range of [1, 5000].
The length of words[i] will be in the range of [1, 50]. */

/**
 * @param {string} S
 * @param {string[]} words
 * @return {number}
 */
//creat the index at every character's position, then binary search on each word's character, 
//record a increasing S index, its index array must has a value greater than current index. 
const code = c => c.charCodeAt(0) - 'a'.charCodeAt(0); //error, use charAt but charCodeAt
const ceiling = (arr, target) => { //find first greater/equal key for subsequence
    let l = 0, r = arr.length;
    while (l < r) {
        const mid = Math.floor((l + r)/2);
        if (arr[mid] >= target) r = mid;
        else l = mid + 1;
    }
    return l; 
}; 
var numMatchingSubseq = function(S, words) {
    let ans = 0;
    const map = [...S].reduce((a, c, i) => {a[code(c)].push(i); return a;}, [...Array(26)].map(() => [])); //index all char's position array
outer:  
    for (let w of words) {
        let i = 0; //record the match idx on S, which is value in index array.
        for (let c of w) {
            if (map[code(c)].length === 0 || i > map[code(c)][map[code(c)].length - 1]) continue outer; 
            //if this c's index array is empty or no large value for match, then current word fails, continue to next word. 
            const key = ceiling(map[code(c)], i); //else take the ceiling key of this value i
            i = map[code(c)][key] + 1; //increase to next i, ceiling value of index array, error: forget to use value but key
        }
        ans++;
    }
    return ans;
};


//clever solution, because S is very long, which is key factor of runtime
//so we go through S once, to match all the words at the same time.
//subsequence is keep the same sequence, which is major property we can use.
//create 26 head/bucket, rearrange all the word according the match, first put same starting char into the char's head, record its match idx = 0
//the node structure is {word: 'word', idx: 0}
//go through S, when char match this head/bucket, take out all the nodes under this head, each node increase the idx by 1, push it to the next character's head
//when match to the word's end, increase the ans, for this word it is done.
var numMatchingSubseq2 = function(S, words) { //O(S.length) + words.length * word.length
    let ans = 0;
    const heads = [...Array(26)].map(() => []);
    for (let w of words) heads[code(w.charAt(0))].push({ w, idx: 0, });
    for (let s of S) {
        const tmp = heads[code(s)];//take over the collection reference
        heads[code(s)] = []; //error: must clear first, because word may has two continuous same characters, so it should be push to its self head.
        for (let node of tmp) {
            node.idx++;
            if (node.idx === node.w.length) {
                ans++;
            } else {
                heads[code(node.w.charAt(node.idx))].push(node); //may push to the same head, which is cleared, so it is fine.
            }
        }
    }
    return ans;
};

console.log(numMatchingSubseq2("abcde", ["a", "bb", "acd", "ace"])); //3
console.log(numMatchingSubseq2("btovxbkumc", ["btovxbku","to","zueoxxxjme","yjkclbkbtl"])); //2


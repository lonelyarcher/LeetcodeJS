/* You want to form a target string of lowercase letters.

At the beginning, your sequence is target.length '?' marks.  You also have a stamp of lowercase letters.

On each turn, you may place the stamp over the sequence, and replace every letter in the sequence with the corresponding letter from the stamp.  
You can make up to 10 * target.length turns.

For example, if the initial sequence is "?????", and your stamp is "abc",  then you may make "abc??", "?abc?", "??abc" in the first turn.  
(Note that the stamp must be fully contained in the boundaries of the sequence in order to stamp.)

If the sequence is possible to stamp, then return an array of the index of the left-most letter being stamped at each turn.  
If the sequence is not possible to stamp, return an empty array.

For example, if the sequence is "ababc", and the stamp is "abc", then we could return the answer [0, 2], 
corresponding to the moves "?????" -> "abc??" -> "ababc".

Also, if the sequence is possible to stamp, it is guaranteed it is possible to stamp within 10 * target.length moves.  
Any answers specifying more than this number of moves will not be accepted.

 

Example 1:

Input: stamp = "abc", target = "ababc"
Output: [0,2]
([1,0,2] would also be accepted as an answer, as well as some other answers.)
Example 2:

Input: stamp = "abca", target = "aabcaca"
Output: [3,0,1]
 

Note:

1 <= stamp.length <= target.length <= 1000
stamp and target only contain lowercase letters. */

/**
 * @param {string} stamp
 * @param {string} target
 * @return {number[]}
 */
//Reverse the Simulation, the last stamp can be back to 'a????ca', then search backward to all '??????'
//Since it is backward, and not require the minimum stamping times, so once we find any match we can reverse it immediately until no matches, using while loop
//when no match, if the string is ??????, then return every stamp index. Otherwise return []; 
//if matched before (in seen set), which means all char are changed to ? already, then skip it return false
var movesToStamp = function(stamp, target) {
    const s = [...stamp], t = [...target], m = s.length, n = t.length, ans = [], seen = new Set();
    const match = i => {
        if (seen.has(i)) return false;
        let match = true, count = 0;
        for (let j = 0; j < m; j++) {
            if (s[j] !== t[i + j] && t[i + j] !== '?') {
                match = false;
                break;
            }
            count += (t[i + j] === '?');
        }
        if (match && count < m) {
            for (let j = 0; j < m; j++) t[i + j] = '?';
            ans.push(i);
            seen.add(i);
            return true;
        }
        return false;
    }
    let anyMatch = true;
    while (anyMatch) {
        anyMatch = false;
        for (let i = 0; i <= t.length - s.length; i++) anyMatch = anyMatch || match(i);
    }
    return t.every(ch => ch === '?') ? ans.reverse() : [];
};

console.log(movesToStamp("k", "kkkkkkkkkkkkkkk"));//
console.log(movesToStamp("f", "ffffffffff"));//
console.log(movesToStamp("aye", "eyeye"));//[]
console.log(movesToStamp(stamp = "abc", target = "ababc")); //0, 2
console.log(movesToStamp(stamp = "abca", target = "aabcaca")); //3, 0, 1
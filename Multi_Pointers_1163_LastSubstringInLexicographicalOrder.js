/* Given a string s, return the last substring of s in lexicographical order.

Note:

1 <= s.length <= 4 * 10^5
s contains only lowercase English letters. */

/**
 * @param {string} s
 * @return {string}
 */
var lastSubstring = function(s) { //the max substring must be one of suffix string
    //so we only need to find the maximum beginning idx (i) of s.
    //ci the maximum which will be the beginning of suffix string
    //pi the pointer from i, for following char comparing.
    //k the second idx of maximum char, j the major moving pointer.
    let i = 0, ci = s.charAt(0), pi = 0, k, j = 0;
    for (let j = 1; j < s.length; j++) {
        const c = s.charAt(j);
        if (c > ci) { //new char > cur max, then begin with new char idx
            i = pi = j; 
            ci = c;
            k = undefined;
        } else if (k && s.charAt(pi) < c) { //two max idx and the second following char > the first following char,     
            i = pi = k; //set the second to the first
            k = undefined;//then abandon the first max idx,
        } else if (k && s.charAt(pi) > c) {//or the new char j is smaller than first following char pi
            k = undefined; //abandon the second max idx because it is small than the first max idx
            pi = i;
        } else if (k && pi === k) { //hardest point, to solve the 'aaaaa...aaa' situations.
            //two max idx, if first point pi meet the the second max idx j, 
            //if means you find the third same max char at j.
            //then no need to keep the second following, because the first following is longer than the second following.
            //and the third following will record as the second
            k = j;
            pi = i;
        } else if (k && s.charAt(pi) === c) {//if we has the second max idx, we keep moving the first pointer for comparing the char j.
            pi++;
        } else if (!k && c === ci) {
            k = j;
            pi++;
        }

    }
    return s.slice(i);
};

console.log(lastSubstring("zzbbzzzaaa")); //"zzzaaa"

console.log(lastSubstring("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz")); 

console.log(lastSubstring("abab")); //"bab"
//Explanation: The substrings are ["a", "ab", "aba", "abab", "b", "ba", "bab"]. The lexicographically maximum substring is "bab".

console.log(lastSubstring("xbylisvborylklftlkcioajuxwdhahdgezvyjbgaznzayfwsaumeccpfwamfzmkinezzwobllyxktqeibfoupcpptncggrdqbkji"));
// "zzwobllyxktqeibfoupcpptncggrdqbkji"


console.log(lastSubstring("leetcode")); // "tcode"
 



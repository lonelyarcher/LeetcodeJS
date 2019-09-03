/* Given a string s, we make queries on substrings of s.

For each query queries[i] = [left, right, k], we may rearrange the substring s[left], ..., s[right], and then choose up to k of them to replace with any lowercase English letter. 

If the substring is possible to be a palindrome string after the operations above, the result of the query is true. Otherwise, the result is false.

Return an array answer[], where answer[i] is the result of the i-th query queries[i].

Note that: Each letter is counted individually for replacement so if for example s[left..right] = "aaa", and k = 2, we can only replace two of the letters.  (Also, note that the initial string s is never modified by any query.)

 

Example :

Input: s = "abcda", queries = [[3,3,0],[1,2,0],[0,3,1],[0,3,2],[0,4,1]]
Output: [true,false,false,true,true]
Explanation:
queries[0] : substring = "d", is palidrome.
queries[1] : substring = "bc", is not palidrome.
queries[2] : substring = "abcd", is not palidrome after replacing only 1 character.
queries[3] : substring = "abcd", could be changed to "abba" which is palidrome. Also this can be changed to "baab" first rearrange it "bacd" then replace "cd" with "ab".
queries[4] : substring = "abcda", could be changed to "abcba" which is palidrome.
 

Constraints:

1 <= s.length, queries.length <= 10^5
0 <= queries[i][0] <= queries[i][1] < s.length
0 <= queries[i][2] <= s.length
s only contains lowercase English letters. */


//when meets string made of lower case characters (26) only, we should think to use bit mask for character appearance map
//for this problem, whether a substring could be a palidrome with any rearrangement, which means only the characters count matters, actually is the odd/even count of char matters.
//for a palidrome, you can only have one odd count char which can be placed in the middle of string.
//so we need find how many chars have odd count in substring.
//odd/even can be represented by '1/0', so this count map can be converted to a bit mask with 26 binary digits, which is compressed to one integer.
//since we need calculate a array of substring, so can pre-calculate the preCount as a bit-mask integer array, substring [i, j] = preCount[j + 1] - preCount[i]
//the answer for each substring will be the number of odd count char /2 <= replacements, which mean we replace one to another, on replacement could solve two odd count chars.
var canMakePaliQueries = function(s, queries) {
    const code = ch => ch.charCodeAt(0) - 'a'.charCodeAt(0); //convert lower case char to number 0 ~ 25
    const preCount = [...s].reduce((a, c) => {
        let nc = a[a.length - 1];
        nc ^= (1 << code(c)); //take NOT on one bit, which means we update the odd/even status of on char count
        a.push(nc);
        return a;
    }, [0]);
    
    
    return queries.map(q => {
        let subCount = preCount[q[1] + 1] ^ preCount[q[0]]; 
        //take XOR, we can find odd/even status of [i, j], if both are same odd/even, the different should be even, otherwise is odd.
        let oddChs = 0;
        while(subCount > 0) { //count the 1 bit in the bit mask which is number of odd count chars.
            oddChs += subCount & 1;
            subCount >>= 1;
        }
        return Math.floor(oddChs/2) <= q[2];
    });
};



console.log(canMakePaliQueries("ofcvmry", [[0,1,0],[5,6,2],[5,5,1],[2,3,2]])); //[false,true,true,true]

console.log(canMakePaliQueries(s = "abcda", queries = [[3,3,0],[1,2,0],[0,3,1],[0,3,2],[0,4,1]]));
//Output: [true,false,false,true,true]
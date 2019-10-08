/* This problem is an interactive problem new to the LeetCode platform.

We are given a word list of unique words, each word is 6 letters long, and one word in this list is chosen as secret.

You may call master.guess(word) to guess a word.  The guessed word should have type string and must be from the original list with 6 lowercase letters.

This function returns an integer type, representing the number of exact matches (value and position) of your guess to the secret word.  Also, if your guess is not in the given wordlist, it will return -1 instead.

For each test case, you have 10 guesses to guess the word. At the end of any number of calls, if you have made 10 or less calls to master.guess and at least one of these guesses was the secret, you pass the testcase.

Besides the example test case below, there will be 5 additional test cases, each with 100 words in the word list.  The letters of each word in those testcases were chosen independently at random from 'a' to 'z', such that every word in the given word lists is unique.

Example 1:
Input: secret = "acckzz", wordlist = ["acckzz","ccbazz","eiowzz","abcczz"]

Explanation:

master.guess("aaaaaa") returns -1, because "aaaaaa" is not in wordlist.
master.guess("acckzz") returns 6, because "acckzz" is secret and has all 6 matches.
master.guess("ccbazz") returns 3, because "ccbazz" has 3 matches.
master.guess("eiowzz") returns 2, because "eiowzz" has 2 matches.
master.guess("abcczz") returns 4, because "abcczz" has 4 matches.

We made 5 calls to master.guess and one of them was the secret, so we pass the test case. */

/**
 * // This is the master's API interface.
 * // You should not implement it, or speculate about its implementation
 * function Master() {
 *
 *     @param {string[]} wordlist
 *     @param {Master} master
 *     @return {integer}
 *     this.guess = function(word) {
 *         ...
 *     };
 * };
 */
/**
 * @param {string[]} wordlist
 * @param {Master} master
 * @return {void}
 */


var findSecretWord = function(wordlist, master) {
    const similar = [...Array(wordlist.length)].map(() => ({}));
    for (let i = 0; i < wordlist.length; i++) {
        for (let j = i + 1; j < wordlist.length; j++) {
            const m = match(wordlist[i], wordlist[j]);
            similar[i][m] = similar[i][m] || [];
            similar[i][m].push(wordlist[j]);
            similar[j][m] = similar[j][m] || [];
            similar[j][m].push(wordlist[i]);
        }
    }
    const maxMatchSize = similar.map(s => s.reduce((a, c) => c.length > a ? c.length : a, 0));
    const guess = maxMatchSize.reduce((a, c, i, arr) => c < arr[a] ? i : a);
    const score = master.guess(wordlist[guess]);
    if (score === wordlist[guess].length) return;
    if (similar[guess][score]) findSecretWord(similar[guess][score], master);
};

const match = (w1, w2) => {
    let match = 0;
    for (let k = 0; k < Math.min(w1.length, w2.length); k++) {
        if (w1.charAt(k) === w2.charAt(k)) match++;
    }
    return match;
};

//the two word if len = 6, the probability of 0 match is (25/26) ^ 6 = 80%, 
//so the short solution may be only guess the min 0 match word
//iteration has less overhead than recursion
var findSecretWord = function(wordlist, master) {
    for (let k = 0; k < 10; k++) {
        const count = Array(wordlist.length).fill(0);
        for (let i = 0; i < wordlist.length; i++) {
            for (let j = i + 1; j < wordlist.length; j++) {
                if (match(wordlist[i], wordlist[j]) === 0) {
                    count[i] = count[j] = 0;
                };
            }
        }
        const candidate = wordlist[count.reduce((a, c, i) => c < count[a] ? i : a, 0)];
        const score = master.guess(candidate);
        if (score.length === candidate.length) return;
        wordlist = wordlist.filter(c => match(candidate, c) === score);
    }
}


class Master {
    constructor(word, wordlist) {
        this.wordlist = wordlist;
        this.word = word;
    }
    guess(w) {
        let ans = this.wordlist.includes(w) ? -1 : match(w, this.word);
        console.log("return " + ans);
        return ans;
    }
}

const master = new Master("acckzz", ["acckzz","ccbazz","eiowzz","abcczz"]);
findSecretWord(master.wordlist, master);

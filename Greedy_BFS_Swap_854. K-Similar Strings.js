/* Strings A and B are K-similar (for some non-negative integer K) if we can swap the positions of two letters in A exactly K times 
so that the resulting string equals B.

Given two anagrams A and B, return the smallest K for which A and B are K-similar.


1 <= A.length == B.length <= 20
A and B contain only lowercase letters from the set {'a', 'b', 'c', 'd', 'e', 'f'} */

/**
 * @param {string} A
 * @param {string} B
 * @return {number}
 */



//BFS on greedy truncate.  (only swap once on unmatched pair only)
//You can swap at any position, so string order doesn't matter. 
//let's assume we always begin swap from left, find first unmatched pairs at i, A[i] !== B[i],  
//then try to find next pair j where j>i A[j] !== B[j] and A[j] === B[i] to swap
//there maybe multiple j positions you can swap, so you can use BFS to record each possible swap to search, state is the string after swap.
//the swap is symmetrical, the target is remove the circles: like [AB BA] => [BB AA], [AB BC CD DA] => [BB CC DD AA], is optimum
// [AB BC CB BA] has two ways: by sequence you need 3 swap. but if you swap BC CB and AB BA, then only 2 swap is needed.
//There is a way to reduce the search, we know any unmatched pair needs swap and any unmatched pair will only be swapped once. so this help us 
//we can each step just swap one unmatched pair i, try all possible j to different state, then do the same procedure again on new state if the state is not visited.  
//the order to swap any unmatched pair doesn't matter, so we can always swap the left most unmatched pairs until all pair matched.


var kSimilarity = function(A, B) {
    if (A === B) return 0;
    const seen = new Set([A]);
    const queue = [A];
    let step = 0;
    while (queue.length) {
        const len = queue.length;
        step++;
        for (let l = 0; l < len; l++) {
            const S = queue.shift();
            for (let i = 0; i < S.length; i++) {
                if (S.charAt(i) === B.charAt(i)) continue;//only swap on unmatched pair
                for (let j = i + 1; j < S.length; j++) {
                    if (S.charAt(j) === B.charAt(i) && S.charAt(j) !== B.charAt(j)) { //the swap must fix the i to make i matched, and j is unmatched also
                        const ns = S.slice(0, i) + S.charAt(j) + S.slice(i + 1, j) + S.charAt(i) + S.slice(j + 1);
                        if (ns === B) return step;
                        if (!seen.has(ns)) {
                            seen.add(ns);
                            queue.push(ns);
                        }
                    }
                }
                break; //key part, any unmatched pair only need be swap once, after swap it will be matched, so we move on. the order to swap any unmatched pair doesn't matter
            }
        }
    }
    return -1;
};

console.log(kSimilarity("abccaacceecdeea", "bcaacceeccdeaae")); //9
console.log(kSimilarity("bccaba", "abacbc")); //3
console.log(kSimilarity(A = "ab", B = "ba")); //1
console.log(kSimilarity(A = "abc", B = "bca")); //2
console.log(kSimilarity(A = "abac", B = "baca")); //2
console.log(kSimilarity(A = "aabc", B = "abca")); //2
/* Let's say a positive integer is a superpalindrome if it is a palindrome, and it is also the square of a palindrome.

Now, given two positive integers L and R (represented as strings), return the number of superpalindromes in the inclusive range [L, R].

 

Example 1:

Input: L = "4", R = "1000"
Output: 4
Explanation: 4, 9, 121, and 484 are superpalindromes.
Note that 676 is not a superpalindrome: 26 * 26 = 676, but 26 is not a palindrome.
 

Note:

1 <= len(L) <= 18
1 <= len(R) <= 18
L and R are strings representing integers in the range [1, 10^18).
int(L) <= int(R) */

/**
 * @param {string} L
 * @param {string} R
 * @return {number}
 */
//generate the palindrome number in odd/even number, left + reverse(left part), then square to check it is still a palindrome number
//Loop from 0 to 100000, if <= R and >= L, then valid
//O(n ^ 0.25)
var superpalindromesInRange = function(L, R) {
    const l = parseInt(L), r = parseInt(R);
    const magic = 100000;
    
    const reverse = x => {
        let ans = 0;
        while (x > 0) {
            ans = ans*10 + x%10;
            x = Math.floor(x/10);
        }
        return ans;
    };
    
    const isPalindrome = x => {
        return x === reverse(x);  
    };
    
    let ans = 0;
    //odd length
    for (let i = 0; i < magic; i++) {
        const s = i.toString();
        const ps = s + [...s.slice(0, -1)].reverse().join('');
        const sq = parseInt(ps) ** 2;
        if (sq > r) break;
        if (sq >= l && isPalindrome(sq)) ans++;
    }
    //even length
    for (let i = 0; i < magic; i++) {
        const s = i.toString();
        const ps = s + [...s].reverse().join('');
        const sq = parseInt(ps) ** 2;
        if (sq > r) break;
        if (sq >= l && isPalindrome(sq)) ans++;
    }
    return ans;
};

console.log(superpalindromesInRange(L = "4", R = "1000")); //4


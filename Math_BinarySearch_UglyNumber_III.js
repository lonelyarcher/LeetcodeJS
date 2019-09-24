/* Write a program to find the n-th ugly number.

Ugly numbers are positive integers which are divisible by a or b or c.

 

Example 1:

Input: n = 3, a = 2, b = 3, c = 5
Output: 4
Explanation: The ugly numbers are 2, 3, 4, 5, 6, 8, 9, 10... The 3rd is 4.
Example 2:

Input: n = 4, a = 2, b = 3, c = 4
Output: 6
Explanation: The ugly numbers are 2, 3, 4, 6, 8, 9, 12... The 4th is 6.
Example 3:

Input: n = 5, a = 2, b = 11, c = 13
Output: 10
Explanation: The ugly numbers are 2, 4, 6, 8, 10, 11, 12, 13... The 5th is 10.
Example 4:

Input: n = 1000000000, a = 2, b = 217983653, c = 336916467
Output: 1999999984
 

Constraints:

1 <= n, a, b, c <= 10^9
1 <= a * b * c <= 10^18
It's guaranteed that the result will be in range [1, 2 * 10^9] */

/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
//Mathmatics: greate common divisor and lowest common multiple
var nthUglyNumber = function(n, a, b, c) {
    const gcd = (a, b) => { //greatest common divisor, remember
        if (a % b === 0) return b;
        return gcd(b, a % b);
    }
    //console.log(lcd(a, b), lcd(a, c), lcd(b, c));
    const lcm = (a, b) => a * b / gcd(a, b); //lowest common multiple
    const NumOfUgly = n => {
        return ~~(n/a) + ~~(n/b) + ~~(n/c) - ~~(n/lcm(a, b)) - ~~(n/lcm(a, c)) - ~~(n/lcm(b, c)) + (~~(n/lcm(lcm(a, b), c)));
    };
    //Binary Search to find N th elements
    let l = 1, r = n * Math.min(a, b, c) + 1;
    while(l < r) {
        const mid = ~~((l + r) / 2);
        if (NumOfUgly(mid) >= n) r = mid;
        else l = mid + 1;
    }
    return l;
};

console.log(nthUglyNumber(9,5,9,8));//24
console.log(nthUglyNumber(n = 3, a = 2, b = 3, c = 5));  //4
console.log(nthUglyNumber(n = 4, a = 2, b = 3, c = 4)); //6
console.log(nthUglyNumber(n = 5, a = 2, b = 11, c = 13)); //10
console.log(nthUglyNumber(n = 1000000000, a = 2, b = 217983653, c = 336916467)); //1999999984

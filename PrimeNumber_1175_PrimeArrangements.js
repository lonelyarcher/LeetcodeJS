/* Return the number of permutations of 1 to n so that prime numbers are at prime indices (1-indexed.)

(Recall that an integer is prime if and only if it is greater than 1, and cannot be written as a product of two positive integers both smaller than it.)

Since the answer may be large, return the answer modulo 10^9 + 7.

 

Example 1:

Input: n = 5
Output: 12
Explanation: For example [1,2,5,4,3] is a valid permutation, but [5,2,3,4,1] is not because the prime number 5 is at index 1.
Example 2:

Input: n = 100
Output: 682289015
 

Constraints:

1 <= n <= 100 */

/**
 * @param {number} n
 * @return {number}
 */
const isPrime = n => {
    if (n === 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++){
        if (n % i === 0) return false;
    }
    return true;
}
const mod = 1000000007;
const factorial = n => [...Array(n)].reduce((a, c, i) => (a * (i + 1)) % mod, 1);

var numPrimeArrangements = function(n) {
    let pcount = 0;
    for (let i = 2; i <= n; i++) {
        if(isPrime(i)) pcount++;
    }
    console.log(pcount);
    let ans = 1;
    for (let i = 1; i <= Math.max(pcount, n - pcount); i++) {
        if (i <= pcount) ans = ans*i % mod;
        if(i <= n - pcount) ans = ans*i % mod; 
    }
    return ans;
}

console.log(numPrimeArrangements(75)); //12

const sieve = n => { //Sieve
    let p = 2;
    const prime = Array(n + 1).fill(true);
    prime[0] = false;
    prime[1] = false;
    while (p <= Math.sqrt(n)) {
        if (prime[p]) {
            for (let i = 2 * p; i <= n; i += p) {
                prime[i] = false;
            }
        }
        p++;
    }
    return prime.filter(p => p).length;
}

var numPrimeArrangements2 = function(n) {
    let pcount = sieve(n);
    let ans = 1;
    for (let i = 1; i <= Math.max(pcount, n - pcount); i++) {
        if (i <= pcount) ans = ans*i % mod;
        if(i <= n - pcount) ans = ans*i % mod; 
    }
    return ans;
};

console.log(numPrimeArrangements2(75)); //12
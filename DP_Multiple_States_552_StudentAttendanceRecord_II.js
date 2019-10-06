/* Given a positive integer n, return the number of all possible attendance records with length n, which will be regarded as rewardable. 
The answer may be very large, return it after mod 10^9 + 7.

A student attendance record is a string that only contains the following three characters:

'A' : Absent.
'L' : Late.
'P' : Present.
A record is regarded as rewardable if it doesn't contain more than one 'A' (absent) or more than two continuous 'L' (late).

Example 1:
Input: n = 2
Output: 8 
Explanation:
There are 8 records with length 2 will be regarded as rewardable:
"PP" , "AP", "PA", "LP", "PL", "AL", "LA", "LL"
Only "AA" won't be regarded as rewardable owing to more than one absent times.  */

/**
 * @param {number} n
 * @return {number}
 */
//brute force, O(3^n)
var checkRecord_bruteforce = function(n) {
    let count = 0;
    const dfs = (s, absent) => {
        if (s.length === n) count++;
        else {
            if (!absent) dfs(s + 'A', true);
            if (s.length < 2 || s.charAt(s.length - 1) !== 'L' || s.charAt(s.length - 2) !== 'L') dfs(s + 'L', absent);
            dfs(s + 'P', absent);
        } 
    }
    dfs('', false);
    return count;
};

//dp  A: has one A and no ends with L,  AL: one A and ends with one L,  ALL: one A and ends will LL,  NA NAL NALL: No A other same
//init: A:1, AL: 0, ALL: 0, NA: 1, NAL: 1,  NALL: 0
//trans:  A[i] = A[i - 1] + AL[i - 1] + ALL[i - 1] + NA[i - 1] + NAL[i - 1] + NALL[i - 1], AL[i] = A[i - 1], ALL[i] = AL[i - 1]  
//        NA[i] = NA[i - 1] + NAL[i - 1] + NALL[i - 1], NAL[i] = NA[i - 1], NALL[i] = NAL[i - 1]  
//return A[n] + AL[n] + ALL[n] + NA[n] + NAL[n] + NALL[n]
var checkRecord_dp = function(n) {
    let A = [1], AL = [0], ALL = [0], NA = [1], NAL = [1],  NALL = [0];
    for (let i = 1; i < n; i++) {
        A[i] = A[i - 1] + AL[i - 1] + ALL[i - 1] + NA[i - 1] + NAL[i - 1] + NALL[i - 1];
        AL[i] = A[i - 1];
        ALL[i] = AL[i - 1]; 
        NA[i] = NA[i - 1] + NAL[i - 1] + NALL[i - 1];
        NAL[i] = NA[i - 1];
        NALL[i] = NAL[i - 1];  
    }
    
    return A[n - 1] + AL[n - 1] + ALL[n - 1] + NA[n - 1] + NAL[n - 1] + NALL[n - 1];
};


console.log(checkRecord_dp(2)); //8
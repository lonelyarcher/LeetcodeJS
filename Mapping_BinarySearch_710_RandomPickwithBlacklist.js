/* Given a blacklist B containing unique integers from [0, N), write a function to return a uniform random integer from [0, N) which is NOT in B.

    Optimize it such that it minimizes the call to system’s Math.random().
    
    Note:
    
    1 <= N <= 1000000000
    0 <= B.length < min(100000, N)
    [0, N) does NOT include N. See interval notation.
    Example 1:
    
    Input: 
    ["Solution","pick","pick","pick"]
    [[1,[]],[],[],[]]
    Output: [null,0,0,0]
    Example 2:
    
    Input: 
    ["Solution","pick","pick","pick"]
    [[2,[]],[],[],[]]
    Output: [null,1,1,1]
    Example 3:
    
    Input: 
    ["Solution","pick","pick","pick"]
    [[3,[1]],[],[],[]]
    Output: [null,0,0,2]
    Example 4:
    
    Input: 
    ["Solution","pick","pick","pick"]
    [[4,[2]],[],[],[]]
    Output: [null,1,3,1]
    Explanation of Input Syntax:
    
    The input is two lists: the subroutines called and their arguments. Solution's constructor has two arguments, N and the blacklist B. pick has no arguments. Arguments are always wrapped with a list, even if there aren't any. */


    /**
 * @param {number} N
 * @param {number[]} blacklist
 */

// random on whitelist, [0, N - blacklist.length)
// each pick: k = Math.random()*(N - blacklist.length)
//find out the whitelist number from this random k
//two ways: 
//1. binary search k in blacklist, find out how many element small or equal k, add the number to the k to get real number in whitelist
//2. replace the blacklist in N - blacklist.length part with the whitelist after N - blacklist.length, 
//create a map save the mapping, so if random k in the map, then get its whitelist number in right part.


//binary search O(BlogB)
var Solution_binarySearch = function(N, blacklist) {
    this.blacklist = blacklist.sort((a, b) => a - b);
    this.N = N - blacklist.length;
};

/**
 * @return {number}
 */
//binary search O(logB)
Solution.prototype.pick_binarySearch = function() {
    const k = Math.floor(this.N * Math.random());
    let l = 0, r = this.blacklist.length;
    while (l < r) {
        let mid = Math.floor((l + r) / 2);
        //find first idx of blacklist, which the whitelist number before this blacklist item is greater than k
        //Binary Search template, only find first LE GT. When find last needs, we can do find First - 1 alternatively
        // every blacklist item, the whitelist item before it = 
        // blacklist item's value (which means how many items before it, both whitelist and blacklist) 
        // - its idx (which means how many black items before it, blacklist only)
        // For example:  0 (1) 2 (3), 1,3 are in blacklist, so the whitelist items before 3 is: 3 - 1 = 2, two whitelist items 0 and 2
        if (this.blacklist[mid] - mid > k) { 
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l === 0 ? k : k + l;   
};


//mapping left part of blacklist to whitelist in the right part:  O(B)
var Solution = function(N, blacklist) {
    let p = N - blacklist.length; //pointer in the beginning of right part
    const bset = new Set(blacklist);
    this.map = blacklist.reduce((a, c) => {
        if (c < N - blacklist.length) { //if left side blacklist item, need to mapping
            while (bset.has(p)) p++; //find a whitelist item in the right
            a[c] = p++; //mapping and move the pointer to next
        }
        return a;
    }, {});

    this.N = N - blacklist.length;
};

/**
 * @return {number}
 */
//mapping O(1)
Solution.prototype.pick = function() {
    const k = Math.floor(this.N * Math.random());
    return this.map[k] ? this.map[k] : k;
};



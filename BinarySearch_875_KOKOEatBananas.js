/* Koko loves to eat bananas.  There are N piles of bananas, the i-th pile has piles[i] bananas.  The guards have gone and will come back in H hours.

Koko can decide her bananas-per-hour eating speed of K.  Each hour, she chooses some pile of bananas, and eats K bananas from that pile.  If the pile has less than K bananas, she eats all of them instead, and won't eat any more bananas during this hour.

Koko likes to eat slowly, but still wants to finish eating all the bananas before the guards come back.

Return the minimum integer K such that she can eat all the bananas within H hours.

 

Example 1:

Input: piles = [3,6,7,11], H = 8
Output: 4
Example 2:

Input: piles = [30,11,23,4,20], H = 5
Output: 30
Example 3:

Input: piles = [30,11,23,4,20], H = 6
Output: 23
 

Note:

1 <= piles.length <= 10^4
piles.length <= H <= 10^9
1 <= piles[i] <= 10^9 */

/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function(piles, H) {
    const hours = k => {
        let ans = 0;
        for (let pile of piles) {
            ans += pile%k === 0 ? Math.floor(pile/k) : Math.floor(pile/k + 1);
        }
        return ans;
    };
    let l = 1, r = Math.max(...piles) + 1;
    while(l < r) {
        const mid = Math.floor((l + r)/2);
        if (hours(mid) <= H) r = mid;
        else l = mid + 1;
    }
    return l;
    
};

console.log(minEatingSpeed(piles = [3,6,7,11], H = 8)); //4
console.log(minEatingSpeed(piles = [30,11,23,4,20], H = 5)); //30
console.log(minEatingSpeed(piles = [30,11,23,4,20], H = 6)); //23
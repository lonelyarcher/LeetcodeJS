/* You have one chocolate bar that consists of some chunks. Each chunk has its own sweetness given by the array sweetness.

You want to share the chocolate with your K friends so you start cutting the chocolate bar into K+1 pieces using K cuts, each piece consists of some consecutive chunks.

Being generous, you will eat the piece with the minimum total sweetness and give the other pieces to your friends.

Find the maximum total sweetness of the piece you can get by cutting the chocolate bar optimally.

 

Example 1:

Input: sweetness = [1,2,3,4,5,6,7,8,9], K = 5
Output: 6
Explanation: You can divide the chocolate to [1,2,3], [4,5], [6], [7], [8], [9]
Example 2:

Input: sweetness = [5,6,7,8,9,1,2,3,4], K = 8
Output: 1
Explanation: There is only one way to cut the bar into 9 pieces.
Example 3:

Input: sweetness = [1,2,2,1,2,2,1,2,2], K = 2
Output: 5
Explanation: You can divide the chocolate to [1,2,2], [1,2,2], [1,2,2]
 

Constraints:

0 <= K < sweetness.length <= 10^4
1 <= sweetness[i] <= 10^5 */

/**
 * @param {number[]} sweetness
 * @param {number} K
 * @return {number}
 */

//Split the sweetness array to make every chunk sum larger than min (your chunk as generous as you can)
//you can binary search on this min, find the largest min which satisfy the chunks number is enough for you and you friends = 1 + K
var maximizeSweetness = function(sweetness, K) {
    const cut = min => {
        let chunks = 0, chunkSum = 0, i = 0;
        for (let s of sweetness) {
            chunkSum += s;
            if (chunkSum >= min) { //every chunk must >= min
                chunkSum = 0;
                chunks++;
            }
        }
        return chunks;
    };
    let l = 1, r = 10**9 + 1; //left inclusive and right exclusive
    while (l < r) {
        const mid = ~~((l + r)/2);
        if(cut(mid) < K + 1) r = mid;//find the first one unsatisfy the cutting
        else l = mid + 1;
    }
    return l - 1; //minus one, then it is the first one satisfy the cutting
};
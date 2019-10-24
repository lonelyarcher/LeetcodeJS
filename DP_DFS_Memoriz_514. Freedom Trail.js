/* In the video game Fallout 4, the quest "Road to Freedom" 
requires players to reach a metal dial called the "Freedom Trail Ring", 
and use the dial to spell a specific keyword in order to open the door.

Given a string ring, which represents the code engraved on the outer ring 
and another string key, which represents the keyword needs to be spelled. 
You need to find the minimum number of steps in order to spell all the characters 
in the keyword.

Initially, the first character of the ring is aligned at 12:00 direction. 
You need to spell all the characters in the string key one by one 
by rotating the ring clockwise or anticlockwise to make each character of the string key 
aligned at 12:00 direction and then by pressing the center button.

At the stage of rotating the ring to spell the key character key[i]:

You can rotate the ring clockwise or anticlockwise one place, which counts as 1 step. 
The final purpose of the rotation is to align one of the string ring's characters 
at the 12:00 direction, where this character must equal to the character key[i].
If the character key[i] has been aligned at the 12:00 direction, 
you need to press the center button to spell, which also counts as 1 step. 
After the pressing, you could begin to spell the next character in the key (next stage), 
otherwise, you've finished all the spelling.
Example:


 
Input: ring = "godding", key = "gd"
Output: 4
Explanation:
For the first key character 'g', since it is already in place, we just need 1 step to spell this character. 
For the second key character 'd', we need to rotate the ring "godding" anticlockwise by two steps to make it become "ddinggo".
Also, we need 1 more step for spelling.
So the final output is 4.
Note:

Length of both ring and key will be in range 1 to 100.
There are only lowercase letters in both strings and might be some duplcate characters in both strings.
It's guaranteed that string key could always be spelled by rotating the string ring. */

/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
//DP, O(m*n), state (i, j) i match pos on key, and j is pos on ring
//state transition: dp[i][j] => for j pos go left or right to find key[i + 1];
var findRotateSteps = function(ring, key) {
    const m = ring.length; n = key.length;
    const right = [...Array(m)].map(() => Array(26).fill(undefined));//clockwise distance from i to next char j
    const left = [...Array(m)].map(() => Array(26).fill(undefined));//anti-clockwise distance from i to next char j
    for (let i = 0; i < m; i++) {
        let j = 0;
        while(j < m) {
            const r = ring.charCodeAt((i + j) % m) - 'a'.charCodeAt(0);
            if (right[i][r] === undefined) right[i][r] = j;
            const l = ring.charCodeAt((i - j + m) % m) - 'a'.charCodeAt(0);
            if (left[i][l] === undefined) left[i][l] = j;
            j++;
        }
    }
    let s0 = Array(m).fill(Infinity);
    s0[0] = 0;
    for (let i = 0; i < n; i++) {
        const s1 = Array(m).fill(Infinity);
        for (let j = 0; j < m; j++) {
            if (s0[j] !== Infinity) {
                let l = left[j][key.charCodeAt(i) - 'a'.charCodeAt(0)];
                let r = right[j][key.charCodeAt(i) - 'a'.charCodeAt(0)];
                s1[(j - l + m) % m] = Math.min(s1[(j - l + m) % m], 1 + s0[j] + l);
                s1[(j + r) % m] = Math.min(s1[(j + r + m) % m], 1 + s0[j] + r);
            }
        }
        s0 = s1;
    }
    return Math.min(...s0);
};
console.log(findRotateSteps("godding", "godding")); //13
console.log(findRotateSteps("godding", "gd")); //4
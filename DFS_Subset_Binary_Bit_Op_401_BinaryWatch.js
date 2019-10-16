/* A binary watch has 4 LEDs on the top which represent the hours (0-11), and the 6 LEDs on the bottom represent the minutes (0-59).

Each LED represents a zero or one, with the least significant bit on the right.


For example, the above binary watch reads "3:25".

Given a non-negative integer n which represents the number of LEDs that are currently on, return all possible times the watch could represent.

Example:

Input: n = 1
Return: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
Note:
The order of output does not matter.
The hour must not contain a leading zero, for example "01:00" is not valid, it should be "1:00".
The minute must be consist of two digits and may contain a leading zero, for example "10:2" is not valid, it should be "10:02". */

/**
 * @param {number} num
 * @return {string[]}
 */

 //DFS, n length combination subset
var readBinaryWatch = function(num) {
    if (num === 0) return ["0:00"];
    const arr = [[1, 0], [2, 0], [4, 0], [8, 0], [0, 1], [0, 2], [0, 4], [0, 8], [0, 16], [0, 32]];
    const ans = [];
    const dfs = (set, cur) => {//subset, save set and curent idx, to avoid repeat like [x, y] and [y, x] only add next element which idx after it.
        if (set.size === num) { //when reach the target length
            const time = [...set].reduce((a, c) => [a[0] + c[0], a[1] + c[1]]);
            if (time[0] < 12 && time[1] < 60)  ans.push(time);//watch only 0-11 hour and 0-59 minute, 12 = 0, 60 = 0 which means no light on
            return;
        }
        for (let i = cur; i < arr.length; i++) { //iterate the idx from cur
            if (!set.has(arr[i])) {
                set.add(arr[i]);
                dfs(set, i + 1);
                set.delete(arr[i]); //backtrack
            }
        }
    };
    dfs(new Set(), 0);//dfs begin with empty set and next adding idx as zero
    return ans.sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(t => t[0] + ':' + t[1].toString().padStart(2, '0'));
};
//test
for (let i = 0; i < 5; i++) console.log(readBinaryWatch(i).join());

//Binary Number, the watch minute 6 digits binary number, add hour another 4 digits, total 10 digits.
//we can loop i from 1 to 2^10 = 1024, if one of i has CountOneBit === target number of lights, it is one of combinations
const countOne = n => {
    let ans = 0;
    while (n > 0) {
        ans += (n & 1);
        n >>= 1;
    }
    return ans;
};
var readBinaryWatch2 = function(num) {
    let ans = [];
    for (let i = 0; i < 1024; i++) {
        if (countOne(i) === num && i % 64 < 60 && ~~(i / 64) < 12) {
            ans.push(~~(i / 64) + ':' + (i % 64).toString().padStart(2, '0'));
        }
    }
    return ans;
};

//test
for (let i = 0; i < 5; i++) console.log(readBinaryWatch2(i).join());
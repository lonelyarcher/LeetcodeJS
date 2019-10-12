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
var readBinaryWatch = function(num) {
    if (num === 0) return ["0:00"];
    const ans = ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"];
    const add = (s1, s2) => {
        const a1 = s1.split(":");
        const a2 = s2.split(":");
        return (parseInt(a1[0]) + parseInt(a2[0])) + ":" + (parseInt(a1[1]) + parseInt(a2[1]));
    };
    for (let i = 2; i <= num; i++) {
        ans = 
    }
    
    
};
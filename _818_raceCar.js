/* Your car starts at position 0 and speed +1 on an infinite number line. 
 (Your car can go into negative positions.)

Your car drives automatically according to a sequence of instructions 
A (accelerate) and R (reverse).

When you get an instruction "A", 
your car does the following: position += speed, speed *= 2.

When you get an instruction "R", 
your car does the following: if your speed is positive then speed = -1 , 
otherwise speed = 1.  (Your position stays the same.)

For example, after commands "AAR", 
your car goes to positions 0->1->3->3, and your speed goes to 1->2->4->-1.

Now for some target position, 
say the length of the shortest sequence of instructions to get there.
1 <= target <= 10000.
 */

 /**
 * @param {number} target
 * @return {number}
 */
const bitLen = x => {
    let bit = 0;
    while(x >>= 1) bit++;
    return bit;
};
var racecar = function(target) {
    if (target === 0) return 0;
    const lower = 1 << bitLen(target);
    if (target === lower) return 'A'.repeat(bitLen);
    const higher = lower << 1;
    return Math.min(racecar(target - lower) + bitLen + 2, racecar(higher - target) + bitLen + 2);
};


 
console.log(racecar(3)); //2, AA 0->1->3

console.log(racecar(6)); //5, AAARA 0->1->3->7->7->6.


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
//greedy algorithm, it go straight to targe by A, find the time (n) to position 2**n - 1 before target and pass target, 
//1. before target point: 2**n - 1: R A (try m times A) m = [0 to n - 1], and find min steps, then subproblem target will be target - (2**n - 1) + (2**m - 1) which is small than previous target
//2. turn back after passing target at 2**(n + 1) - 1, then subproblem will be passPoint - target
//user memorized search to caching.



const memo = {};
var racecar_dp = function(target) {
    if (target === 0) return 0;
    if (memo[target]) return memo[target];
    const n = parseInt(Math.log2(target + 1), 10);
    const past = 2**(n + 1) - 1;
    const before = 2**n - 1; 
    if (target === before) return n;
    //scenario 1: past the target
    memo[target] = racecar(past - target) + n + 2; //2 means RR, turn around
    //scenario 2: before the target, R then A backward for i = 0 to n - 1 times
    for (let i = 0; i < n; i++) {
        memo[target] = Math.min(memo[target], n + 1 + i + 1 + racecar(target - before + (2**i - 1)));
        //                                    A*n R A*i   R  
    }
    return memo[target];
};


//BFS state = {position, speed} 
var racecar = function(target) {
    visited = {'0_1': 1};   //start position visited
    const queue = [[0, 1]]; //start position
    let step = 0;
    while(queue.length) {
        let n = queue.length;
        for (let i = 0; i < n; i++) {
            const [pos, speed] = queue.shift();
            if (pos === target) return step;
            //action A:
            if (speed <= 2 * target && !visited[`${pos + speed}_${speed * 2}`]) { //prune if speed became > 2 * target
                queue.push([pos + speed, speed*2]);
                visited[`${pos + speed}_${speed * 2}`] = 1;
            }
            //action R:
            const nsp = speed > 0 ? -1 : 1;
            if (!visited[`${pos}_${nsp}`]) {
                queue.push([pos, nsp]);
                visited[`${pos}_${nsp}`] = 1;
            }
        }
        step++;
    }
};


 
console.log(racecar(3)); //2, AA 0->1->3
console.log(racecar(4)); //5, 0->1->3->3->3->4,
console.log(racecar(5)); //7 aararaa 0->1->3->3->2->2->3->5
console.log(racecar(6)); //5, AAARA 0->1->3->7->7->6.


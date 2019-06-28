/*Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, +, -, *, / operators and empty spaces . The integer division should truncate toward zero.

Example 1:

Input: "3+2*2"
Output: 7
Example 2:

Input: " 3/2 "
Output: 1
Example 3:

Input: " 3+5 / 2 "
Output: 5
Note:

You may assume that the given expression is always valid.
Do not use the eval built-in library function.*/

/**
 * @param {string} s
 * @return {number}
 */
var cal = (a, b, o) => {
    switch(o) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        default: return  Math.trunc(a / b);
    }
};
const opposite = op => {
    switch(op) {
        case '+': return '-';
        case '-': return '+';
    }
};
var calculate = function(s) {
    //result: before the */, pre: since */, cur: current read number
    let result = 0, pre = 0, cur = 0;
    for (const c of [...s]) {
        if (c === ' ') continue;
        if (/[0-9]/.test(c)) {
            cur = cur * 10 + parseInt(c);
        } else {
            result = cal(result, cur, op);
            if (/\*|\//.test(c) && /\+|\-/.test(op)) {
                result = cal(result, pre, opposite(op));
                cur = cal(pre, cur, op);
                pre = cur;
            }
        }         
    }
    return result;
};

console.info(calculate("3+2*2"));
//Output: 7


console.info(calculate(" 3/2 "));
//Output: 1


console.info(calculate(" 3+5 / 2 "));
//Output: 5

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
 //use stack to save the number, need num and sign, then sum up to the answer.
 //when meet operator */, we save the previous operator as op, then pop up the top of stack, calculate then push it back.
var calculateByStack = function(s) {
    let num = 0, op = '+', sign = 1;
    const st = [];
    for (const c of s + '+') {
        if (c === ' ') continue;
        if (/[0-9]/.test(c)) {
            num = num * 10 + parseInt(c);
        } else {
            if (/\*|\//.test(op)) {
                st.unshift(cal(st.shift(), num, op));    
            } else {
                st.unshift(num * sign);
            }
            sign = c === '-' ? -1 : 1;
            num = 0;
            op = c;
        }         
    }
    return st.reduce((a, c) => a + c);
};
//without stack, record two part, sum up part (stack) is pre, the current calculate part is cur, the current reading digis is num
//begin with 0 + s, so pre = cur = num = 0; 
//if op, the previous record operator is +/-, then add the cur to pre, set cur to num with sign of +/-
//if op is */, then pre is kept, but calculate current with number.
//at the end, add the pre and cur to get the answer.
var calculate = function(s) {
    let op = '+', pre = cur = num = 0;
    for (const c of s + '+') {
        if (c === ' ') continue;
        if (/[0-9]/.test(c)) {
            num = num * 10 + parseInt(c);
        } else {
            if (/\*|\//.test(op)) {
                cur = cal(cur, num, op);    
            } else {
                pre += cur;
                cur = num * (op === '-' ? -1 : 1);
            }
            num = 0;
            op = c;
        }         
    }
    return pre + cur;
};

console.info(calculate("3+2*2"));
//Output: 7


console.info(calculate(" 3/2 "));
//Output: 1


console.info(calculate(" 3+5 / 2 "));
//Output: 5

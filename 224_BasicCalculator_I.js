/*Implement a basic calculator to evaluate a simple expression string.

The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

Example 1:

Input: "1 + 1"
Output: 2
Example 2:

Input: " 2-1 + 2 "
Output: 3
Example 3:

Input: "(1+(4+5+2)-3)+(6+8)"
Output: 23
Note:
You may assume that the given expression is always valid.
Do not use the eval built-in library function.*/

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    let result = 0, operand = 0, sign = 1; 
    //result is the result of current level expr (to left)
    //operand is current number being processed.
    //sign is the sign for next operator is +/-
    const st = []; 
    //push result and sign to stack when new '(' comes, pop when meet ')'
    for (const c of [...s]) {
        if (c === ' ') continue;
        if (/[0-9]/.test(c)) {
            operand = operand * 10 + parseInt(c);
        } else {
            result += sign * operand;
            operand = 0;
            if (c === '+') {
                sign = 1;
            } else if (c === '-') {
                sign = -1;
            } else if (c === '(') {
                st.unshift(result);
                st.unshift(sign);
                //reset result and sign after push prev into stack
                result = 0;
                sign = 1;
            } else {
                result *= st.shift();
                result += st.shift();
            }
        }
    }
    return operand === 0 ? result : result + sign * operand;
};

console.info(calculate("(1+(4+5+2)-3)+(6+8)"));
//Output: 23
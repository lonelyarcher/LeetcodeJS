/* Implement a basic calculator to evaluate a simple expression string.

The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

The expression string contains only non-negative integers, +, -, *, / operators , open ( and closing parentheses ) and empty spaces . The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of [-2147483648, 2147483647].
*/

console.info(calculate("1 + 1")); // = 2
console.info(calculate(" 6-4 / 2 ")); // = 4
console.info(calculate("2*(5+5*2)/3+(6/2+8)")); // = 21
console.info(calculate("(2+6* 3+5- (3*14/7+2)*5)+3")); //=-12 

const cal = (a, b, o) => {
    switch(o) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        default: return  Math.trunc(a / b);
    }
};

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    
};


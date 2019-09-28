/* Return the result of evaluating a given boolean expression, represented as a string.

An expression can either be:

"t", evaluating to True;
"f", evaluating to False;
"!(expr)", evaluating to the logical NOT of the inner expression expr;
"&(expr1,expr2,...)", evaluating to the logical AND of 2 or more inner expressions expr1, expr2, ...;
"|(expr1,expr2,...)", evaluating to the logical OR of 2 or more inner expressions expr1, expr2, ...
 

Example 1:

Input: expression = "!(f)"
Output: true
Example 2:

Input: expression = "|(f,t)"
Output: true
Example 3:

Input: expression = "&(t,f)"
Output: false
Example 4:

Input: expression = "|(&(t,f,t),!(t))"
Output: false
 

Constraints:

1 <= expression.length <= 20000
expression[i] consists of characters in {'(', ')', '&', '|', '!', 't', 'f', ','}.
expression is a valid expression representing a boolean, as given in the description. */

/**
 * @param {string} expression
 * @return {boolean}
 */
const or = (a, b) => a || b;
const and = (a, b) => a && b;
const not = a => !a;
var parseBoolExpr = function(expression) {
    let op = or, cur = false;
    const st = [];
    for (c of expression) {
        if (c === '&') {
            st.unshift([op, cur]);
            op = and;
            cur = true;
        } else if (c === '|') {
            st.unshift([op, cur]);
            op = or;
            cur = false;
        } else if (c === '!') {
            st.unshift([op, cur]);
            op = not;
            cur = null;
        } else if (c === ')'){
            const [preop, precur] = st.shift();
            cur = preop.call(null, cur, precur);
            op = preop; //mistake, I forget when pop out op then I need set current op to it.
        } else if (/[tf]/.test(c)) {
            const ncur = c === 't' ? true : false;
            cur = op.call(null, ncur, cur);
        }
    }
    return cur ? true : false;
};

console.log(parseBoolExpr('&(f,&( f,f,|(f)),t)')); //false

console.log(parseBoolExpr('|(&(t,f,t),!(t))')); //false
console.log(parseBoolExpr('!(!(t))')); //true
console.log(parseBoolExpr('!( &(f,&( f,f,|(f)),t) )')); //true
console.log(parseBoolExpr('|(f)')); //false
console.log(parseBoolExpr('&(f)')); //false
console.log(parseBoolExpr('|(t)')); //true
console.log(parseBoolExpr('&( f,f,|(f) )')); //false
console.log(parseBoolExpr('t')); //true
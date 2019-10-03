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
var parseBoolExpr_st = function(expression) {
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

//Recursion with a pointer i
var parseBoolExpr = function(expression) {
    let i = 0;
    const parse = () => { //parse from current i, after parse move the point i to next position for next parse
        let ans;
        switch(expression.charAt(i++)) { //after read i, move the point to next position
            case 't': 
                return true;
            case 'f': 
                return false;
            case '!': //!(t)
                ans = !parse(++i);//skip (
                i++; //skip )
                return ans;
            case '|': //|(t, t)
                ans = false;
                i++
                while (true) {
                    ans = parse(i) || ans; //make sure parse be executed, so put it at first
                    if (expression.charAt(i++) === ')') break;
                }
                return ans;
            case '&':
                ans = true;
                i++;
                while (true) {
                    ans = parse(i) && ans; //Mistake, before I write ans && parse(i), which cause error, because the && is short-circuit, if ans fails, then the parse will never be executed
                    if (expression.charAt(i++) === ')') break;
                }
                return ans;
        }      
    };
    return parse();
};


console.log(parseBoolExpr('&(f,&(f,f,|(f)),t)')); //false
console.log(parseBoolExpr('|(&(t,f,t),!(t))')); //false
console.log(parseBoolExpr('!(!(t))')); //true
console.log(parseBoolExpr('!(&(f,&(f,f,|(f)),t))')); //true
console.log(parseBoolExpr('|(f)')); //false
console.log(parseBoolExpr('&(f)')); //false
console.log(parseBoolExpr('|(t)')); //true
console.log(parseBoolExpr('&(f,f,|(f))')); //false
console.log(parseBoolExpr('&(!(t),&(f),|(f))')); //false

console.log(parseBoolExpr("&(&(&(!(&(f)),&(t),|(f,f,t)),|(t),|(f,f,t)),!(&(|(f,f,t),&(&(f),&(!(t),&(f),|(f)),&(!(&(f)),&(t),|(f,f,t))),&(t))),&(!(&(&(!(&(f)),&(t),|(f,f,t)),|(t),|(f,f,t))),!(&(&(&(t,t,f),|(f,f,t),|(f)),!(&(t)),!(&(|(f,f,t),&(&(f),&(!(t),&(f),|(f)),&(!(&(f)),&(t),|(f,f,t))),&(t))))),!(&(f))))"));
/* You are given a string expression representing a Lisp-like expression to return the integer value of.

The syntax for these expressions is given as follows.

An expression is either an integer, a let-expression, an add-expression, a mult-expression, or an assigned variable. Expressions always evaluate to a single integer.
(An integer could be positive or negative.)
A let-expression takes the form (let v1 e1 v2 e2 ... vn en expr), where let is always the string "let", then there are 1 or more pairs of alternating variables and expressions, meaning that the first variable v1 is assigned the value of the expression e1, the second variable v2 is assigned the value of the expression e2, and so on sequentially; and then the value of this let-expression is the value of the expression expr.
An add-expression takes the form (add e1 e2) where add is always the string "add", there are always two expressions e1, e2, and this expression evaluates to the addition of the evaluation of e1 and the evaluation of e2.
A mult-expression takes the form (mult e1 e2) where mult is always the string "mult", there are always two expressions e1, e2, and this expression evaluates to the multiplication of the evaluation of e1 and the evaluation of e2.
For the purposes of this question, we will use a smaller subset of variable names. A variable starts with a lowercase letter, then zero or more lowercase letters or digits. Additionally for your convenience, the names "add", "let", or "mult" are protected and will never be used as variable names.
Finally, there is the concept of scope. When an expression of a variable name is evaluated, within the context of that evaluation, the innermost scope (in terms of parentheses) is checked first for the value of that variable, and then outer scopes are checked sequentially. It is guaranteed that every expression is legal. Please see the examples for more details on scope.
Evaluation Examples:
Input: (add 1 2)
Output: 3

Input: (mult 3 (add 2 3))
Output: 15

Input: (let x 2 (mult x 5))
Output: 10

Input: (let x 2 (mult x (let x 3 y 4 (add x y))))
Output: 14
Explanation: In the expression (add x y), when checking for the value of the variable x,
we check from the innermost scope to the outermost in the context of the variable we are trying to evaluate.
Since x = 3 is found first, the value of x is 3.

Input: (let x 3 x 2 x)
Output: 2
Explanation: Assignment in let statements is processed sequentially.

Input: (let x 1 y 2 x (add x y) (add x y))
Output: 5
Explanation: The first (add x y) evaluates as 3, and is assigned to x.
The second (add x y) evaluates as 3+2 = 5.

Input: (let x 2 (add (let x 3 (let x 4 x)) x))
Output: 6
Explanation: Even though (let x 4 x) has a deeper scope, it is outside the context
of the final x in the add-expression.  That final x will equal 2.

Input: (let a1 3 b2 (add a1 1) b2) 
Output 4
Explanation: Variable names can contain digits after the first character.

Note:

The given string expression is well formatted: There are no leading or trailing spaces, there is only a single space separating different components of the string, and no space between adjacent parentheses. The expression is guaranteed to be legal and evaluate to an integer.
The length of expression is at most 2000. (It is also non-empty, as that would not be a legal expression.)
The answer and all intermediate calculations of that answer are guaranteed to fit in a 32-bit integer. */


/* This question is relatively straightforward in terms of the idea of the solution, but presents substantial difficulties in the implementation.

Expressions may involve the evaluation of other expressions, which motivates a recursive approach.

One difficulty is managing the correct scope of the variables. We can use a stack of hashmaps. As we enter an inner scope defined by parentheses, we need to add that scope to our stack, and when we exit, we need to pop that scope off.

Our main evaluate function will go through each case of what form the expression could take.

If the expression starts with a digit or '-', it's an integer: return it.

If the expression starts with a letter, it's a variable. Recall it by checking the current scope in reverse order.

Otherwise, group the tokens (variables or expressions) within this expression by counting the "balance" bal of the occurrences of '(' minus the number of occurrences of ')'. When the balance is zero, we have ended a token. For example, (add 1 (add 2 3)) should have tokens '1' and '(add 2 3)'.

For add and mult expressions, evaluate each token and return the addition or multiplication of them.

For let expressions, evaluate each expression sequentially and assign it to the variable in the current scope, then return the evaluation of the final expression. */

/* stack<scope(hashmap)>
( - push existing scope into stack
) - pop out previous scope
recursion to handle each expr ()
inside expr, first parse the op: let, mult, add 
let -> parse scope
mult -> 
*/




/**
 * @param {string} expression
 * @return {number}
 */
//recursive call eval() to a expression and move the pointer i 
var evaluate = function(expression) {
    const st = []; //implement scope with stack
    let scope = {};
    let i = 0;

    const eval = () => {
        const c = expression.charAt(i);
        if (c === '(') {
            st.unshift({...scope});//when (, push copy of current into stack
            const nc = expression.charAt(++i); 
            let ret;
            if (nc === 'a') {//add x y
                i += 4;
                const v1 = eval();
                i++
                const v2 = eval();
                ret = v1 + v2;
            } else if (nc === 'm') {//mult x y
                i += 5;
                const v1 = eval();
                i++;
                const v2 = eval();
                ret = v1 * v2;
            } else if (nc === 'l') {//let x1 e1 x2 e2 ... e, e can be number, variable or expr
                i += 4;
                while(true) {
                    if (expression.charAt(i) === '(') { //the last e when it is expr beginning with ()
                        ret = eval();
                        break;
                    }
                    const k = read(); //read the variable as key
                    if (expression.charAt(i) === ' ') {//read its value 
                        i++; 
                        const v = eval();//recursive call eval its value
                        scope[k] = v; //update scope
                        i++;
                    } else {
                        ret = scope[k] ? scope[k] : parseInt(k);
                        break;
                    }
                }
            }
            i++; //handle ')'
            scope = st.shift(); //when out ), pop out previous scope copy to use
            return ret;
        } else if (/[0-9\-]/.test(c)) {
            return parseInt(read());
        } else if (/[a-z]/.test(c)) {
           return scope[read()];
        }
    };
    const read = () => {
        let s = '';
        //regular expression: not only space '\s' but also ')'
        while (!/[\s)]/.test(expression.charAt(i))) s += expression.charAt(i++);
        return s;
    };
    return eval();
};

console.log(evaluate('(add 1 2)')); //3
console.log(evaluate('(mult 3 (add 2 3))')); //15
console.log(evaluate('(let x 2 (mult x 5))')); //10
console.log(evaluate('(let x 2 (mult x (let x 3 y 4 (add x y))))')); //14
console.log(evaluate('(let x 3 x 2 x)')); //2
console.log(evaluate('(let x 1 y 2 x (add x y) (add x y))')); //5
console.log(evaluate('(let x 2 (add (let x 3 (let x 4 x)) x))')); //6
console.log(evaluate('(let a1 3 b2 (add a1 1) b2)')); //4 
console.log(evaluate('(let x 7 -12)')); // -12

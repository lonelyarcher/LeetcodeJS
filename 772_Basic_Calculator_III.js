/* Implement a basic calculator to evaluate a simple expression string.

The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

The expression string contains only non-negative integers, +, -, *, / operators , open ( and closing parentheses ) and empty spaces . The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of [-2147483648, 2147483647].
*/





/**
 * @param {string} s
 * @return {number}
 */
const calculate = s => { 
    
    //   ... pre-calculated       2       *     5 (reding number)    [+-*/()] end of the reading number, could be one of them
    //        [pre],            [cur]   [op]        [num]                                   [c]
    let num = 0, op = '+', pre = 0, cur = 0;  //initiate value as  '0  0 + '

    const st = []; 
    //stack for parenthesis, ( push the previous pre, cur, op into the stack, ) pop the previous pre, cur, op out of the top of stack
    for (const c of s+'+') {
        if (c === ' ') continue;
        if (/[0-9]/.test(c)) num = num * 10 + parseInt(c);
        else { //end of reading number
            if ("+-*/)".includes(c)) {  //calculte cur and pre, the ( is skipped, because it must follow another non-number character so it is already calculated
                if (/[\+\-]/.test(op)) {  //if +-, the add the cur to the pre
                    pre = pre + cur;
                    cur = num * (op === '-' ? -1 : 1);
                } else {  //if */, high priority calculation first into cur
                    cur = cal(cur, num, op);
                }
                op = c;
                num = 0;
            } 
            if (c === '(') {  //push inot stack, and reset pre, cur, op for new start value. 
                st.unshift({pre, cur, op});
                op = '+';
                pre = cur = 0;
                num = 0;
            }
            if (c === ')') { //pop out the previous stack, need calculate first as number to previous stack
                num = pre + cur;
                ({ pre, cur, op } = st.shift());  //ES6, destructive assignment without declaring
            }         
        }
    }
    return pre + cur;
}

const cal = (a, b, o) => {
    switch(o) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        default: return  Math.trunc(a / b);
    }
};

//console.info(calculate("1 + 1")); // = 2
//console.info(calculate(" 6-4 / 2 ")); // = 4
//console.info(calculate("2*(5+5*2)/3+(6/2+8)")); // = 21
console.info(calculate("(2+6* 3+5- (3*14/7+2)*5)+3")); //=-12



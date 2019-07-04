/**
Given an expression such as expression = "e + 8 - a + 5" and an evaluation map such as {"e": 1} (given in terms of evalvars = ["e"] and evalints = [1]), return a list of tokens representing the simplified expression, such as ["-1*a","14"]

An expression alternates chunks and symbols, with a space separating each chunk and symbol.
A chunk is either an expression in parentheses, a variable, or a non-negative integer.
A variable is a string of lowercase letters (not including digits.) Note that variables can be multiple letters, and note that variables never have a leading coefficient or unary operator like "2x" or "-x".
Expressions are evaluated in the usual order: brackets first, then multiplication, then addition and subtraction. For example, expression = "1 + 2 * 3" has an answer of ["7"].

The format of the output is as follows:

For each term of free variables with non-zero coefficient, we write the free variables within a term in sorted order lexicographically. For example, we would never write a term like "b*a*c", only "a*b*c".
Terms have degree equal to the number of free variables being multiplied, counting multiplicity. (For example, "a*a*b*c" has degree 4.) We write the largest degree terms of our answer first, breaking ties by lexicographic order ignoring the leading coefficient of the term.
The leading coefficient of the term is placed directly to the left with an asterisk separating it from the variables (if they exist.)  A leading coefficient of 1 is still printed.
An example of a well formatted answer is ["-2*a*a*a", "3*a*a*b", "3*b*b", "4*a", "5*c", "-6"] 
Terms (including constant terms) with coefficient 0 are not included.  For example, an expression of "0" has an output of [].
Examples:



expression will have length in range [1, 250].
evalvars, evalints will have equal lengths in range [0, 100].
Intuition

Keep a class Poly that knows a map from a list of free variables to a coefficient, and support operations on this class.

Algorithm

Each function is straightforward individually. Let's list the functions we use:
*/

const add = (m1, m2) => { //returns the result of m1 + m2.
    const ans = new Map(m2);
    for(const [k, v] of m1.entries()) {
        ans.set(k, (ans.get(k) || 0) + v); 
    }
    return ans;
};

const sub = (m1, m2) => { //returns the result of m1 - m2.
    const ans = new Map(m2);
    for(const [k, v] of m1.entries()) {
        ans.set(k, (ans.get(k) || 0) - v); 
    }
    return ans;
};

const mul = (m1, m2) => { //returns the result of m1 * m2.
    const ans = new Map();
    for(const [k1, v1] of m1.entries()) {
        for(const [k2, v2] of m1.entries()) {
            ans = add(ans, [[k1.concat(k2).sort(), v1 * v2]])
        }
    }
    return ans;
}
//returns the polynomial after replacing all free variables with constants as specified by evalmap.
const evaluate = (poly, evalmap) =>  [...poly.keys()].reduce((a, c) => {
        let nvalue = poly.get(c);
        const nkey = c;
        c.forEach(e => {
            if (evalmap.hasOwnProperty(e)) nvalue *= evalmap[e];
            else nkey.push(e);
        });
        a.set(nkey, nvalue);
        a.delete(c[0]);
        return a;
    }, new Map());


//returns the polynomial in the correct output format.
const toList = (poly) => {
    return [...poly.keys()].filter(k => poly.get(k) !== 0).sort().map(k => poly.get(k) + (k.length ? k.reduce((a, c) => a+'*'+c) : ''));
}; 

//makes a new Poly represented by either the constant or free variable specified by expr.
const make = (expr) => {
    const poly = new Map();
    if (!expr) return poly;
    if (/[0-9]/.test(expr.charAt(0))) {
        poly.set([], parseInt(expr));
    } else {
        poly.set([expr], 1);
    }
    return poly;
}; 

const cal = (res, pre, op, cur) => {
    if (op === mul) {
        pre = mul(pre, cur);
    } else {
        res = add(res, pre);
        pre = cur;
    }
    return {res, pre};
};

// parses an expression into a new Poly.
const parse = (expr) => { // res pre op cur
    let res = pre = new Map(), cur, num = 0, op = add;
    const st = [];
    for (const c of expr+'+') {
        if (c === ' ') continue;
        if (/[0-9]/.test(c)) {
            num = num * 10 + c;
        } else {
            if (num > 0){
                cur = make(num + '');
                ({res, pre} = cal(res, pre, op, cur));      
            }
            if (/[a-z]/.test(c)) {
                cur = make(c);
                ({res, pre} = cal(res, pre, op, cur));
            }
            if (/[\+\-\*]/.test(c)) {
                op = c === '+' ? add : (c === '-' ? sub : mul);
            }
            if (c === '(') {
                st.unshift({res, pre, op});
                res = pre = new Map();
                op = add;
            }
            if (c === ')') {
                cur = add(res,pre);
                ({res, pre, op} = st.shift());
                ({res, pre} = cal(res, pre, op, cur));
            }
            num = 0;
        }
    }
    return add(res, pre);
};

/*
Complexity Analysis

Time Complexity: Let NN is the length of expression and MM is the length of evalvars and evalints. 
With an expression like (a + b) * (c + d) * (e + f) * ... the complexity is O(2^N + M)O(2^N +M).

Space Complexity: O(N + M)O(N+M).
*/

/**
 * @param {string} expression
 * @param {string[]} evalvars
 * @param {number[]} evalints
 * @return {string[]}
 */
var basicCalculatorIV = function(expression, evalvars, evalints) {
    const evalMap = evalvars.reduce((a, c, i) => { a[c] = evalints[i]; return a; }, {});
    const poly = parse(expression);

    const epoly = evaluate(poly, evalMap);
    return toList(epoly);
};



console.info(basicCalculatorIV("e + 8 - a + 5", ["e"], [1]));  //Output: ["-1*a","14"]
console.info(basicCalculatorIV("e - 8 + temperature - pressure", ["e", "temperature"], [1, 12]));  //Output: ["-1*pressure","5"]
console.info(basicCalculatorIV("(e + 8) * (e - 8)", [], [])); //Output: ["1*e*e","-64"]
console.info(basicCalculatorIV("7 - 7", [], [])); //Output: []
console.info(basicCalculatorIV("a * b * c + b * a * c * 4", [], []));  //Output: ["5*a*b*c"]
console.info(basicCalculatorIV("((a - b) * (b - c) + (c - a)) * ((a - b) + (b - c) * (c - a))", [], [])); 
//Output: ["-1*a*a*b*b","2*a*a*b*c","-1*a*a*c*c","1*a*b*b*b","-1*a*b*b*c","-1*a*b*c*c","1*a*c*c*c","-1*b*b*b*c","2*b*b*c*c","-1*b*c*c*c","2*a*a*b","-2*a*a*c","-2*a*b*b","2*a*c*c","1*b*b*b","-1*b*b*c","1*b*c*c","-1*c*c*c","-1*a*a","1*a*b","1*a*c","-1*b*c"]

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

/*
Complexity Analysis

Time Complexity: Let NN is the length of expression and MM is the length of evalvars and evalints. 
With an expression like (a + b) * (c + d) * (e + f) * ... the complexity is O(2^N + M)O(2^N +M).

Space Complexity: O(N + M)O(N+M).
*/

const add = (m1, m2) => { //returns the result of m1 + m2.
    return Object.keys(m1).reduce((a, c) => { 
        a[c] = (a[c] || 0) + m1[c]; 
        if (a[c] === 0) delete(a[c]); 
        return a; 
    }, m2);
};

const mul = (m1, m2) => { //returns the result of m1 * m2.
    let ans = {};
    Object.keys(m1).forEach(k1 => {
        Object.keys(m2).forEach(k2 => {
            let nkey = '';
            if (k1 === '') nkey = k2;
            else if (k2 === '') nkey = k1;
            else nkey = k1.split(',').concat(k2.split(',')).sort().join();
            ans = add(ans, { [nkey]: m1[k1]*m2[k2] });
            if (ans[nkey] === 0) delete(ans[nkey]);
        });
    });
    return ans;
}
//returns the polynomial after replacing all free variables with constants as specified by evalmap.
const evaluate = (poly, evalmap) =>  Object.keys(poly).reduce((a, k) => {
        let nvalue = poly[k];
        const nkey = [];
        k.split(',').forEach(e => {
            if (evalmap.hasOwnProperty(e)) nvalue *= evalmap[e];
            else nkey.push(e);
        });
        //delete(a[k]);
        a = add(a, { [nkey.join()]: nvalue });
        if (a[nkey] === 0) delete(a[nkey]);
        return a;
    }, {});


//returns the polynomial in the correct output format.
const toList = poly => {
    return Object.keys(poly).filter(k => poly[k] !== 0).sort((a, b) => -(a ? a.split(',').length : 0) + (b ? b.split(',').length : 0) || (a > b ? 1 : -1)).map(k => k ? [poly[k], ...k.split(',')].join('*') : poly[k] + '');
}; 

//makes a new Poly represented by either the constant or free variable specified by expr.
const make = (expr) => {
    const poly = {};
    if (!expr) return {};
    if (/[0-9]/.test(expr.charAt(0))) {
        poly[''] = parseInt(expr);
    } else {
        poly[expr] = 1;
    }
    return poly;

}; 

const cal = (res, pre, op, cur) => {
    if (op === mul) {
        pre = mul(pre, cur);
    } else {
        res = add(res, pre);
        pre = op === add ? cur : mul({ '': -1 }, cur);
    } 
    return {res, pre};
};

// parses an expression into a new Poly.
const parse = (expr) => { // res pre op cur
    let res = pre = {}, cur, num = 0, readNum = false, x = '', op = add;
    const st = [];
    for (const c of expr+'+') {
        if (c === ' ') continue;
        if (/[0-9]/.test(c)) {
            num = num * 10 + parseInt(c);
            readNum = true;
        } else if (/[a-z]/.test(c)) {
            x += c;
        } else {
            if (readNum){
                cur = make(num + '');
                ({res, pre} = cal(res, pre, op, cur));      
            }
            if (x.length) {
                cur = make(x);
                ({res, pre} = cal(res, pre, op, cur));
            }
            if (/[\+\-\*]/.test(c)) {
                op = c === '+' ? add : (c === '-' ? 'sub' : mul);
            }
            if (c === '(') {
                st.unshift({res, pre, op});
                res = pre = {};
                op = add;
            }
            if (c === ')') {
                cur = add(res, pre);
                ({res, pre, op} = st.shift());
                ({res, pre} = cal(res, pre, op, cur));
            }
            num = 0;
            readNum = false;
            x = '';
        }
    }
    return add(res, pre);
};



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

const expr = "11 - 1 - bx * 0 - 10";
const varlist = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az", "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz", "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv"];
const numlist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.info(basicCalculatorIV(expr, varlist, numlist));  //Output: ["-1*a","14"]

console.info(basicCalculatorIV("137", ["e"], []));  //Output: ["-1*a","14"]
console.info(basicCalculatorIV("e + 8 - a + 5", ["e"], [1]));  //Output: ["-1*a","14"]
console.info(basicCalculatorIV("e - 8 + temperature - pressure", ["e", "temperature"], [1, 12]));  //Output: ["-1*pressure","5"]
console.info(basicCalculatorIV("(e + 8) * (e - 8)", [], [])); //Output: ["1*e*e","-64"]
console.info(basicCalculatorIV("7 - 7", [], [])); //Output: []
console.info(basicCalculatorIV("a * b * c + b * a * c * 4", [], []));  //Output: ["5*a*b*c"]
console.info(basicCalculatorIV("((a - b) * (b - c) + (c - a)) * ((a - b) + (b - c) * (c - a))", [], [])); 
//Output: ["-1*a*a*b*b","2*a*a*b*c","-1*a*a*c*c","1*a*b*b*b","-1*a*b*b*c","-1*a*b*c*c","1*a*c*c*c","-1*b*b*b*c","2*b*b*c*c","-1*b*c*c*c","2*a*a*b","-2*a*a*c","-2*a*b*b","2*a*c*c","1*b*b*b","-1*b*b*c","1*b*c*c","-1*c*c*c","-1*a*a","1*a*b","1*a*c","-1*b*c"]

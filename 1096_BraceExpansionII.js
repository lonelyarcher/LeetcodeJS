/*Under a grammar given below, strings can represent a set of lowercase words.  Let's use R(expr) to denote the set of words the expression represents.

Grammar can best be understood through simple examples:

Single letters represent a singleton set containing that word.
R("a") = {"a"}
R("w") = {"w"}
When we take a comma delimited list of 2 or more expressions, we take the union of possibilities.
R("{a,b,c}") = {"a","b","c"}
R("{{a,b},{b,c}}") = {"a","b","c"} (notice the final set only contains each word at most once)
When we concatenate two expressions, we take the set of possible concatenations between two words where the first word comes from the first expression and the second word comes from the second expression.
R("{a,b}{c,d}") = {"ac","ad","bc","bd"}
R("{a{b,c}}{{d,e}f{g,h}}") = R("{ab,ac}{dfg,dfh,efg,efh}") = {"abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"}
Formally, the 3 rules for our grammar:

For every lowercase letter x, we have R(x) = {x}
For expressions e_1, e_2, ... , e_k with k >= 2, we have R({e_1,e_2,...}) = R(e_1) ∪ R(e_2) ∪ ...
For expressions e_1 and e_2, we have R(e_1 + e_2) = {a + b for (a, b) in R(e_1) × R(e_2)}, where + denotes concatenation, and × denotes the cartesian product.
Given an expression representing a set of words under the given grammar, return the sorted list of words that the expression represents.

 

Example 1:

Input: "{a,b}{c{d,e}}"
Output: ["acd","ace","bcd","bce"]
Example 2:

Input: "{{a,z},a{b,c},{ab,z}}"
Output: ["a","ab","ac","z"]
Explanation: Each distinct word is written only once in the final answer.
 

Constraints:

1 <= expression.length <= 50
expression[i] consists of '{', '}', ','or lowercase English letters.
The given expression represents a set of words based on the grammar given in the description.*/
/**
 * @param {string} expression
 * @return {string[]}
 */
const mul = (al, bl) => {
    if (!al.length) return bl;
    if (!bl.length) return al;
    return al.map(a => bl.map(b => a + b)).reduce((a, c) => a.concat(c));
}
const add = (al, bl) => Array.from(new Set(al.concat(bl)));

var braceExpansionII_Recursion = function(expression) {
    let i = 0;
    const list = [];
    const ops = [];
    while (i < expression.length) {
        const c = expression.charAt(i);

        if (c === '{') {
            let level = 1, j = i + 1;
            while (j < expression.length) {
                if (expression.charAt(j) === '{') level++;
                if (expression.charAt(j) === '}') level--;
                if (level === 0) break;
                j++;
            }
            list.push(braceExpansionII(expression.slice(i + 1, j)));
            if (i > 0 && expression.charAt(i - 1) !== ',') ops.push(mul);
            i = j;
        }
        if (/[a-z]/.test(c)){
            let j = i + 1;
            while (j < expression.length && /[a-z]/.test(expression.charAt(j))) {
                j++;
            }
            list.push([expression.slice(i, j)]);
            if (i > 0 && expression.charAt(i - 1) !== ',') ops.push(mul);
            i = j - 1;
        }
            
        if (c === ',') {
            ops.push(add);
        }
        i++;
    }
    for (let i = 1; i < list.length; i++) { //first combine all the multiply operations
        if (ops[i - 1] === mul) {
            list[i] = mul(list[i - 1], list[i]);
            list[i - 1] = [];
        }
    }
    return list.reduce((a, c) => add(a, c)).sort(); //add all list together and sort to answer
};


//with stack, no recursion
const cal = (res, pre, op, cur) => { // res (+) pre op(+/*) cur([c]/stack result)
    if (op === add) {
        res = add(res, pre);
        pre = cur;
        op = mul;
    } else pre = mul(pre, cur);
    return {res, pre, op, cur};
};

var braceExpansionII = function(expression) {   // res (add) pre op cur/[c]
    let res = pre = cur = [], op = mul;
    const st = [];
    for (let i = 0; i < expression.length; i++) {
        const c = expression.charAt(i);
        if (c === '}') {
            cur = add(res, pre);
            ({res, pre, op} = st.shift());
            ({res, pre, op, cur} = cal(res, pre, op, cur));
        }
        if (/^[a-z]$/.test(c)) {
            ({res, pre, op, cur} = cal(res, pre, op, [c]));
        } 
        if (c === '{') {
            st.unshift({res, pre, op});
            res = pre = cur = [];
            op = mul;
        }
        if (c === ',') op = add;       
    }
    return add(res, pre).sort();
};

console.info(braceExpansionII("{{a,z},a{b,c},{ab,z}}"));
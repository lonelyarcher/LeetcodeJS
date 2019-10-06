/* Given a chemical formula (given as a string), return the count of each atom.

An atomic element always starts with an uppercase character, then zero or more lowercase letters, representing the name.

1 or more digits representing the count of that element may follow if the count is greater than 1. If the count is 1, no digits will follow. For example, H2O and H2O2 are possible, but H1O2 is impossible.

Two formulas concatenated together produce another formula. For example, H2O2He3Mg4 is also a formula.

A formula placed in parentheses, and a count (optionally added) is also a formula. For example, (H2O2) and (H2O2)3 are formulas.

Given a formula, output the count of all elements as a string in the following form: the first name (in sorted order), followed by its count (if that count is more than 1), followed by the second name (in sorted order), followed by its count (if that count is more than 1), and so on.

Example 1:
Input: 
formula = "H2O"
Output: "H2O"
Explanation: 
The count of elements are {'H': 2, 'O': 1}.
Example 2:
Input: 
formula = "Mg(OH)2"
Output: "H2MgO2"
Explanation: 
The count of elements are {'H': 2, 'Mg': 1, 'O': 2}.
Example 3:
Input: 
formula = "K4(ON(SO3)2)2"
Output: "K4N2O14S4"
Explanation: 
The count of elements are {'K': 4, 'N': 2, 'O': 14, 'S': 4}.
Note:

All atom names consist of lowercase letters, except for the first character which is uppercase.
The length of formula will be in the range [1, 1000].
formula will only consist of letters, digits, and round parentheses, and is a valid formula as defined in the problem. */

/**
 * @param {string} formula
 * @return {string}
 */

var countOfAtoms = function(formula) {
    let i = 0;
    const parseNum = () => {
        let v = 0;
        while (i < formula.length && /[0-9]/.test(formula.charAt(i))) v = v * 10 + parseInt(formula.charAt(i++));
        return v === 0 ? 1 : v;
    };
    const parse = () => {
        const map = {};
        while (i < formula.length && formula.charAt(i) !== ')') { //parsing need continue until to its end or reach ')' when recursion
            const c = formula.charAt(i++);
            if (/[A-Z]/.test(c)) {
                let e = c;
                while (i < formula.length && /[a-z]/.test(formula.charAt(i))) 
                    e += formula.charAt(i++); //every while loop be careful about the end of index
                map[e] = (map[e] || 0) + parseNum();
            } else if (c === '(') {
                const innerMap = parse();
                for (let key in innerMap) {
                    map[key] = (map[key] || 0) + innerMap[key];
                }
            }
        } 
        if (formula.charAt(i) === ')') {
            i++
            const k = parseNum();
            for (let key in map) {
                map[key] *= k;
            }
        }
        return map;
    };
    const map = parse();
    return Object.keys(map).sort().map(k => map[k] === 1 ? k : k + map[k]).join('');
};

console.log(countOfAtoms('H2O'));//H20.
console.log(countOfAtoms('Mg(OH)2'));//Output: "H2MgO2"
console.log(countOfAtoms("K4(ON(SO3)2)2"));//"K4N2O14S4"
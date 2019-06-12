
const getParentByParentAmount = (input, n) => {
    const map = {};
    input.forEach(e => {
        map[e[1]] = (map[e[1]] || 0) + 1;
        map[e[0]] = map[e[0]] || 0;      
    });
    return Object.keys(map).filter(k => map[k] === n);
}

const input = [[1,3], [2,3], [3,6], [5,6], [5,7],[4,5],[4,8],[8,10]];

console.info("result:");
console.info(getParentByParentAmount(input, 0));
console.info(getParentByParentAmount(input, 1));

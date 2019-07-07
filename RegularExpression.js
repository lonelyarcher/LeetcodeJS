console.info(/^[0-9]+$/.test("5456476")); //exactly match

console.info(/[\+\-\*]/.test('-'));
console.info('aaa' - 'aab');
console.info(['aabb', 'aaab'].sort((a, b) => a > b ? 1 : -1));
console.info(''.split(',').length);
console.info('a'.split(',').length);
console.info({} === {});
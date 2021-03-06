console.info(/^[0-9]+$/.test("5456476")); //exactly match

console.info(/[\+\-\*]/.test('-'));
console.info('aaa' - 'aab');
console.info(['aabb', 'aaab'].sort((a, b) => a > b ? 1 : -1));
console.info(''.split(',').length);
console.info('a'.split(',').length);
console.info({} === {});
console.log(/[a-f]/.test(undefined)); //true, cast to string 'undefined'
console.log(/[a-f]/.test('')); //false
console.log(/n/.test(null)); //true, null cast to string 'null'

console.log(/^[a-f]$/.test(undefined)); //false
console.log(/^[a-f]$/.test('')); //false
console.log(/^[n]$/.test(null)); //false

console.log(/[0-9\-]/.test('-'));
console.log(/[0-9a-z]/.test('1'));
console.log(/^[a-z][0-9a-z]*/.test('x123b2'));
console.log(/^[a-z][0-9a-z]*/.test('1x123b2'));
console.log(/[\s)]/.test(' ')); 
console.log(/[)]/.test(')')); 

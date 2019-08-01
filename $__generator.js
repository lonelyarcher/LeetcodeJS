function *generatorFunc() {
    const x = yield 1;
    console.log(`x: ${x}`);
    const y = yield 2;
    console.log(`y: ${y}`);
}

let iter = generatorFunc();

console.log(iter.next());
console.log(iter.next(3));
console.log(iter.next());
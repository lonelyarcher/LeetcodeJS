console.log(undefined === undefined);
console.log(undefined == null);
console.log(null === null);
console.log(NaN == NaN);
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof NaN);
console.log(typeof []);
console.log([] instanceof Array);
console.log([] instanceof Object);
console.log((x => x) instanceof Function);
console.log([1,2,3][-1]);


const st = [];
let op = (a, b) => a + b;
st.unshift(op); //pass by value, the reference of function
op = (a, b) => a - b; //change outside reference will not affect the inside passed function.
console.log(st.shift().call(null, 4, 2)); //4 + 2 = 6
console.log(undefined === undefined);//true
console.log(undefined == null);//true
console.log(null === null);//true
console.log(NaN == NaN);//false
console.log(typeof null);//object
console.log(typeof undefined);//undefined
console.log(typeof NaN);//number
console.log(typeof []);//object
console.log([] instanceof Array);//true
console.log([] instanceof Object);//true
console.log((x => x) instanceof Function);//true
console.log([1,2,3][-1]);//undefined


const st = [];
let op = (a, b) => a + b;
st.unshift(op); //pass by value, the reference of function
op = (a, b) => a - b; //change outside reference will not affect the inside passed function.
console.log(st.shift().call(null, 4, 2)); //4 + 2 = 6

const arr1 = [...Array(5)].map((v, i) => i);
const arr2 = Array(5).fill([]); //bad, same object filled into all the arr2 elements.
arr2[0].push(1,2,3); //all the arr2 rows was pushed with 1,2,3
console.log(arr1);//[0, 1, 2, 3, 4]
console.log(arr2.map(v => v.join()).join('|'));//1,2,3|1,2,3|1,2,3|1,2,3|1,2,3

let x;
let y;
({x, y} = { x: 1, y: 2 }); 
//destructive assignment without declaration, 
//without parenthesis the {} will be conside as block not object.
let {x1, y1} = {x1: 1, y1: 2}; //with declaration, it is fine.
let {x2:xx2, y2:yy2} = {x2: 1, y2: 2}; //xx2=1, yy2=2

const test = [0];
test.splice(1, 0, 1);
console.log(test.join());//0,1
test.splice(-3, 0, 2);
console.log(test.join());//2,0,1

const arr = [];
arr[5] = 10;
console.log(arr.join());//,,,,,10
console.log(arr[1]);//undefined

console.log('20' - '10');//10, ,minus will cast string to number

const a1 = [1, 2, 3, 4, 5, 6, 7];
//a1.splice(0, 3, 0)
console.log(a1.slice(0, 0).concat([0]).concat(a1.slice(3)));//Array(5) [0, 4, 5, 6, 7]

console.log(0^1); //1
console.log(1^1); //0


console.log(~~(3/2));//1
console.log(~~(-1.232));//-1

if (-1) console.log("-1 is true!");

let xxx;
console.log(xxx = 100);

console.log([...Array(10)].reduce((a, c) => a * 2, 1));
var num = 100;
console.log(num.toString(16));
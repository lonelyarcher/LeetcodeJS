const obj = { a: 1, b: "hello" };
const objB = Object.create(obj);
console.info(objB.b);

const Node = function(val){  //counstructor function can't be arrow function, because arrow funciton doesn't has it own "this"
    this.val = val;
    this.left = null;
    this.right = null;
};

const root = new Node(1);
console.info(root.val);


// Example using a arrow function
function createObject() {  //inside the function, "this" is decided by who calls this function {foo: 21}
    console.log('Inside `createObject`:', this.foo);
    return {
      foo: 42,
      bar: () => console.log('Inside `bar`:', this.foo), 
      //inside arrow function, "this" is decided by lexical ( means "this" in createObject function, which is same as the who call createObject {foo: 21}
      //if it is a function, bar: function() { console.log('Inside `bar`:', this.foo)} then it is who call bar(), which is new Object {foo: 42}
    };
  }
  
createObject.call({foo: 21}).bar(); // override `this` inside createObject


const a = [1,2,3];
const b = [1,2,3];
console.info([1,2,3] == [1,2,3]);
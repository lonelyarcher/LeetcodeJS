mkdir leetcodejs  
cd leetcodejs  
echo "# leetcodeJS" >> README.md  
git init  
git add README.md  
git commit -m "first commit"  
git remote add origin git@github.com:lonelyarcher/leetcodeJS.git  
git push -u origin master  

"workbench.editor.highlightModifiedTabs": true

BFS, visited immidiately after append into queue

Javascripts sort number need (a, b) => a - b

six primitive values: Boolean Null Undefined Number String Symbol

six falsy value: false, 0, "", null, undefined, NaN

NaN == NaN NaN === NaN false

destructuring assignment: ({x, y, z} = func(a)); x,y,z are already declared, so use () to wrap it ES6

array reduce (accumulator, currentValue, currentIdx, array)

function.call(obj, par1, par2) function.apply(obj, [par1, par2])

Object vs Map: Object keys must be string, and has default keys like tostring constructor, valueof, hasOwnProperty, isProtoTypeof
The typeof operator tests whether value belong to one of six basic types: "number", "string", "boolean", "object", "function" or "undefined".
The instanceof operator tests whether the prototype property of a constructor appears anywhere in the prototypes chain of an object.

Java, arraylist equals arraylist if both same length and each elements are equal
But in Javascript, no such rule, object are compared only by reference.

15

Every JavaScript object has an internal "prototype" property, often called [[prototype]], which points to the object from which it directly inherits. This is exposed in FF and Chrome by the non-standard __proto__ property. Object.getPrototypeOf is a getter for this internal property.

Every JavaScript function [object] has a property prototype, which is initialized with an [nearly] empty object. When you create a new instance of this function by calling it as a constructor, the [[prototype]] of that new object will point to the constructor's prototype object.

If you get the [[prototype]] of a function (every function is an object, so it has one), it will result in the Function.prototype object from which functions inherit their methods (like bind, call, apply etc).
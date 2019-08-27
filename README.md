mkdir leetcodejs  
cd leetcodejs  
echo "# leetcodeJS" >> README.md  
git init  
git add README.md  
git commit -m "first commit"  
git remote add origin git@github.com:lonelyarcher/leetcodeJS.git  
git push -u origin master  

"workbench.editor.highlightModifiedTabs": true
"editor.acceptSuggestionOnCommitCharacter": false

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

DP (bottom up) vs Memorized Search (top down):
1. Memorized is usually easier to understand but code is a little bit longer. 
2. DP code will be shorter, but you need figure out how the value constructed from initial ones.
3. Performance, DP (non recursion) is usually better than Memo Search (recursion) because Memo Search need maintains stack.
But when the data is very sparse in subproblem, memo search is better, like multi-dimensional DP not every row/column/cell will be visited in search.
4. if problem need to combines two or more state serial , but use dp with multiple dp arrays. Memo Search will be very hard in this situation. Like sell stock IV, there is two state array, sell[] and buy[]

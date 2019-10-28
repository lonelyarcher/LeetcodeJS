querySelectorAll(.class) //all elements, foreach ok
querySelector('div[name='']') 
getElementById()
getElementsByTagName() //a NodeList represented in collections, no foreach
child = createElement(tagName)//
child.innerHtml = '<div></div>'//insert html content
parentDom.append(child);
.proxy(func, obj) // func.bind(obj)
event.target.checked //get checkbox checked boolean 
event.target.value //get checkbox value attribute
DOM === xml doc
//Ajax call by vanilla javascript XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = () => {
    if (xhr.status === 200) {
        console.log(xhr.responseXML);
    }
};
xhr.send();

1. $.ready(): document.addEventListener("DOMContentLoaded", function(){

});
2. document.readyState (loading, interactive, complete) !== loading
3. put javascript at the end of body, or load .js file defer.
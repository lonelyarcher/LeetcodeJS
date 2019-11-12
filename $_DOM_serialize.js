


function serialize(DOM) {
    if (DOM.nodeType === Node.ELEMENT_NODE) {
        return `<${DOM.tagName} ${DOM.attributes.map(a => `${a.name}: ${a.value}`).join(' ')}>` + DOM.children.map(child => serialize(child)).join('') + `</${DOM.tagName}>`
    } else return DOM.nodeValue;
}


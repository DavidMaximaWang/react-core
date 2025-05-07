import { setValueForStyles } from './CSSPropertyOperations.js';
import { setValueForProperty } from './DOMPropertyOperations.js';
import setTextContent from './setTextContent.js';

function setInitialDOMProperties(tag, domElement, nextProps) {
    for (const propKey in nextProps) {
        if (nextProps.hasOwnProperty(propKey)) {
            const nextProp = nextProps[propKey];
            if (propKey === 'style') {
                setValueForStyles(domElement, nextProp);
            } else if (propKey == 'children') {
                if (typeof nextProp === 'string') {
                    setTextContent(domElement, nextProp);
                } else if (typeof nextProp === 'number') {
                    setTextContent(domElement, `${nextProp}`);
                }
            } else if (nextProp !== null) {
                setValueForProperty(domElement, propKey, nextProp);
            }
        }
    }
}

export function setInitialProperties(domElement, tag, props) {
    setInitialDOMProperties(tag, domElement, props);
}

// Import the hasOwnProperty function and the REACT_ELEMENT_TYPE constant
import hasOwnProperty from 'shared/hasOwnProperty';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';

// Define a set of reserved properties in a React element
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
}

// Check if the config object has a valid ref property
function hasValidRef(config) {
  return config.ref !== undefined;
}

// Check if the config object has a valid key property
function hasValidKey(config) {
  return config.key !== undefined;
}

// Create a React element (a virtual DOM node)
function ReactElement(type, key, ref, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props
  }
}

// Function to create a React element, handling key and ref,
// and collecting the remaining properties into the props object
export function jsxDEV(type, config, maybeKey) {
  let propName;
  const props = {};
  let key = null;
  let ref = null;

  // Use maybeKey as key if it's provided
  if (typeof maybeKey !== 'undefined') {
    key = maybeKey;
  }

  // Override key if present in config
  if (hasValidKey(config)) {
    key = '' + config.key;
  }

  // Set ref if present in config
  if (hasValidRef(config)) {
    ref = config.ref;
  }

  // Copy non-reserved properties from config to props
  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  }

  // Return the constructed React element
  return ReactElement(type, key, ref, props);
}

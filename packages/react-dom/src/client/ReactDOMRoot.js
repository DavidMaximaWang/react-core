import {
    createContainer,
    updateContainer
  } from 'react-reconciler/src/ReactFiberReconciler';

  /**
   * ReactDOMRoot constructor
   *
   * @param {Object} internalRoot - The root node of the React Fiber tree
   *
   * This constructor is used to create a ReactDOMRoot instance. The instance contains
   * an _internalRoot property that references the root of the React Fiber tree.
   */
  function ReactDOMRoot(internalRoot) {
    this._internalRoot = internalRoot;
  }

  /**
   * The render method is responsible for updating or rendering the React component tree
   *
   * @param {ReactElement|ReactComponent} children - The React element or component to be rendered
   *
   * The render method is attached to the prototype of ReactDOMRoot, so every instance of ReactDOMRoot
   * can call this method. When called, it uses the updateContainer function to update or render
   * the provided React element/component (children) into the current Fiber tree
   * (referenced by the _internalRoot property).
   */
  ReactDOMRoot.prototype.render = function (children) {
    const root = this._internalRoot;
    updateContainer(children, root);
  }

  /**
   * Factory function to create the Fiber root node and wrap it in a ReactDOMRoot object
   *
   * @param {HTMLElement} container - The DOM element where the React component should be rendered
   * @returns {ReactDOMRoot} A ReactDOMRoot object that wraps the Fiber root node
   *
   * createRoot is a factory function that takes a DOM element as an argument,
   * usually the root DOM node of the React application.
   * Inside the function, it first calls createContainer with the DOM element to create
   * a Fiber root node. Then, it passes the Fiber root node into the ReactDOMRoot constructor
   * to create a ReactDOMRoot instance, which is returned.
   */
  export function createRoot(container) {
    const root = createContainer(container);
    return new ReactDOMRoot(root);
  }

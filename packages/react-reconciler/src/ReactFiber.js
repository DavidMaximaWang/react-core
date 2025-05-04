import { NoFlags } from 'react-reconciler/src/ReactFiberFlags';
import { HostComponent, HostRoot, HostText, IndeterminateComponent } from 'react-reconciler/src/ReactWorkTags';

export function FiberNode(tag, pendingProps, key) {
    this.tag = tag; // fiber node's type
    this.key = key;
    this.type = null; // fiber node's vdom's type
    this.stateNode = null;
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.memoizedState = null;
    this.updateQueue = null;
    this.flags = NoFlags;
    this.subtreeFlags = NoFlags;
    this.alternate = null;
    this.index = 0;
}


/**
 * Create a new Fiber Node
 * @param {*} tag - fiber type
 * @param {*} pendingProps - new props
 * @param {*} key - identifier
 * @returns {FiberNode}
 */
export function createFiber(tag, pendingProps, key) {
    return new FiberNode(tag, pendingProps, key);
}

export function createHostRootFiber() {
    return createFiber(HostRoot, null, null);
}

export function createWorkInProgress(current, pendingProps) {
    let workInProgress = current.alternate;
    if (workInProgress === null) {
        workInProgress = createFiber(current.tag, pendingProps, current.key);
        workInProgress.type = current.type;
        workInProgress.stateNode = current.stateNode;
        workInProgress.alternate = current;
        current.alternate = workInProgress;
    } else {
        workInProgress.pendingProps = pendingProps;
        workInProgress.type = current.type;
        workInProgress.flags = NoFlags;
        workInProgress.subtreeFlags = NoFlags;
    }
    workInProgress.child = current.child;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.memoizedState = current.memoizedState;
    workInProgress.updateQueue = current.updateQueue;
    workInProgress.sibling = current.sibling;
    workInProgress.index = current.index;
    return workInProgress;
}

function createFiberFromTypeAndProps(type, key, pendingProps) {
    let tag = IndeterminateComponent;
    if (typeof type === 'string') {
        tag = HostComponent;
    }
    const fiber = createFiber(tag, pendingProps, key);
    fiber.type = type;
    return fiber;
}

export function createFiberFromElement(element) {
    const { type, key, props: pendingProps } = element;
    return createFiberFromTypeAndProps(type, key, pendingProps);
}

export function createFiberFromText(text) {
    return createFiber(HostText, text, null);
}

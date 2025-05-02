import { HostRoot } from 'react-reconciler/src/ReactWorkTags';
import { NoFlags } from 'react-reconciler/src/ReactFiberFlags';

export function FiberNode(tag, pendingProps, key) {
    this.tag = tag; // fiber node's type
    this.key = key;
    this.type = null; // fiber node's vdom's type
    this.stateNode = null;
    this.return = null;
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

export function createFilter(tag, pendingProps, key) {
    return new FiberNode(tag, pendingProps, key);
}

export function createHostRootFiber() {
    return createFilter(HostRoot, null, null);
}

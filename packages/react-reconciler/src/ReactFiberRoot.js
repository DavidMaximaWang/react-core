import {createHostRootFiber}  from './ReactFiber'
import {initialUpdateQueue} from './ReactFiberClassUpdateQueue'

function FiberRootNode(containerInfo) {
    this.containerInfo = containerInfo;
}
export function createFiberRoot(containerInfo) {
    const root = new FiberRootNode(containerInfo);
    const unintializedFiber = createHostRootFiber();
    root.current = unintializedFiber;
    unintializedFiber.stateNode = root;
    initialUpdateQueue(unintializedFiber);
    return root;
}

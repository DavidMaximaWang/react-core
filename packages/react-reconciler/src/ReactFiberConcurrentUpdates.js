import { HostRoot } from './ReactWorkTags';

export function markUpdateLaneFromFiberToRoot(fiber) {
    let node = fiber;
    let parent = fiber.return;
    while (parent !== null) {
        node = parent;
        parent = parent.return;
    }
    //find the rootfiber, then the fiberroot= node.stateNode
    if (node.tag === HostRoot) {
        return node.stateNode;
    }
    return null;
}

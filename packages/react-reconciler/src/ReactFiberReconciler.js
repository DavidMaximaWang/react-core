import { createUpdate, enqueueUpdate } from './ReactFiberClassUpdateQueue';
import { markUpdateLaneFromFiberToRoot } from "./ReactFiberConcurrentUpdates.js";
import { createFiberRoot } from './ReactFiberRoot';
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop.js";

export function createContainer(containerInfo) {
    return createFiberRoot(containerInfo);
}

export function updateContainer(element, container) {
    const current = container.current; // root fiber, applicatiuon root-> current
    const update = createUpdate();
    update.payload = { element };
    const root = enqueueUpdate(current, update);
    scheduleUpdateOnFiber(root);
    return markUpdateLaneFromFiberToRoot(fiber);
}

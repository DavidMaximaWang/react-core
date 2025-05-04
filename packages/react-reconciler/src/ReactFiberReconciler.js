import { createUpdate, enqueueUpdate } from './ReactFiberClassUpdateQueue';
import { createFiberRoot } from './ReactFiberRoot';
import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop.js';

/**
 *
 * @param {*} containerInfo - root dom div#root
 * @returns -FiberRoot
 */
export function createContainer(containerInfo) {
    return createFiberRoot(containerInfo);
}

export function updateContainer(element, container) {
    const current = container.current; // root fiber, applicatiuon root-> current
    const update = createUpdate();
    update.payload = { element };
    const root = enqueueUpdate(current, update);
    scheduleUpdateOnFiber(root);
}

import assign from 'shared/assign';
import { markUpdateLaneFromFiberToRoot } from './ReactFiberConcurrentUpdates';

export function initialUpdateQueue(fiber) {
    const queue = {
        shared: {
            pending: null
        }
    };
    fiber.updateQueue = queue;
}

/**
 * Create a state update object
 * @returns {Update} update object
 */
export function createUpdate() {
    const update = {}; // may have different type of update
    return update;
}

/**
 * put the update object to fiber node's update queue
 * @param {FiberNode} fiber - the fibrr node to be added
 * @param {Update} update - the update object to be added
 * @returns {FiberNode} rootfiber
 */
export function enqueueUpdate(fiber, update) {
    const updateQueue = fiber.updateQueue;
    const pending = updateQueue.shared.pending;
    // single circle linked list
    if (pending === null) {
        update.next = update; // update->next->update
    } else {
        // update->next
        update.next = pending.next; //update-> pending.next->update
        pending.next = update;
    }
    updateQueue.shared.pending = update;
    return markUpdateLaneFromFiberToRoot(fiber);
}

export function processUpdateQueue(workInProgress) {
    const queue = workInProgress.updateQueue;
    const pendingQueue = queue.shared.pending;
    if (pendingQueue !== null) {
        queue.shared.pending = null;
        const lastPendingUpdate = pendingQueue;
        const firstPendingUpdate = lastPendingUpdate.next;
        lastPendingUpdate.next = null;
        let newState = workInProgress.memoizedState;
        let update = firstPendingUpdate;
        while (update) {
            newState = getStateFromUpdate(update, newState);
            update = update.next;
        }
        workInProgress.memoizedState = newState;
    }
}

function getStateFromUpdate(update, prevState) {
    const { payload } = update;
    return assign({}, prevState, payload);
}

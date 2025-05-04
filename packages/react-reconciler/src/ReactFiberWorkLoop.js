import { scheduleCallback } from 'scheduler';
import { createWorkInProgress } from './ReactFiber';
import { beginWork } from './ReactFiberBeginWork.js';

let workInProgress = null;

export function scheduleUpdateOnFiber(root) {
    // fiberRoot
    ensureRootIsScheduled(root);
}

function ensureRootIsScheduled(root) {
    scheduleCallback(performConcurrentWorkOnRoot.bind(null, root));
}

function performConcurrentWorkOnRoot(root) {
    renderRootSync(root);
    const finishedWork = root.current.alternate;
    root.finishedWork = finishedWork;
    // commitRoot(root);
}

function renderRootSync(root) {
    prepareFreshStack(root);
    workLoopSync();
}

function prepareFreshStack(root) {
    workInProgress = createWorkInProgress(root.current, null);
}

function workLoopSync() {
    while (workInProgress != null) {
        performUnitOfWork(workInProgress);
    }
}

function performUnitOfWork(unitOfWork) {
    const current = unitOfWork.alternate;
    const next = beginWork(current, unitOfWork);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    workInProgress = null; // todo remove it;
    // if (next === null) {
    //     completeUnitOfWork(unitOfWork)
    // } else {
    //     workInProgress = next;
    // }
}

function completeUnitOfWork(unitOfWork) {
    console.log('begin complete work', unitOfWork);
}

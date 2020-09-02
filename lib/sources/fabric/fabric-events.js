export class FabricEventsMap {
}
FabricEventsMap.Global_MOUSE = {
    up: 'mouse:up',
    down: 'mouse:down',
    move: 'mouse:move',
    upBefore: 'mouse:up:before',
    downBefore: 'mouse:down:before',
    moveBefore: 'mouse:move:before',
    dblclick: 'mouse:dblclick',
    wheel: 'mouse:wheel',
    over: 'mouse:over',
    out: 'mouse:out',
};
FabricEventsMap.Single_MOUSE = {
    up: 'mouseup',
    down: 'mousedown',
    move: 'mousemove',
    upBefore: 'mouseup:before',
    downBefore: 'mousedown:before',
    moveBefore: 'mousemove:before',
    dblclick: 'mousedblclick',
    wheel: 'mousewheel',
    over: 'mouseover',
    out: 'mouseout',
};
FabricEventsMap.GlobalAndSingle_Drag = {
    drop: 'drop',
    dragover: 'dragover',
    dragenter: 'dragenter',
    dragleave: 'dragleave',
};
FabricEventsMap.Global_Before = {
    beforeTransform: 'before:transform',
    beforeSelectionCleared: 'before:selection:cleared',
};
FabricEventsMap.Global_After = {
    afterRender: 'after:render',
};
FabricEventsMap.Global_Selection = {
    cleared: 'selection:cleared',
    created: 'selection:created',
    updated: 'selection:updated',
};
FabricEventsMap.Global_Object = {
    // 添加、删除
    added: 'object:added',
    removed: 'object:removed',
    // 发生了形变
    modified: 'object:modified',
    moving: 'object:moving',
    scaling: 'object:scaling',
    rotating: 'object:rotating',
    skewing: 'object:skewing',
    moved: 'object:moved',
    scaled: 'object:scaled',
    rotated: 'object:rotated',
    skewed: 'object:skewed',
};
FabricEventsMap.Single_Object = {
    // // // 添加、删除       单个对象，也有这个方法（但是Fabric官网的文档没说。）
    added: 'added',
    removed: 'removed',
    // 发生了形变
    modified: 'modified',
    moving: 'moving',
    scaling: 'scaling',
    rotating: 'rotating',
    skewing: 'skewing',
    moved: 'moved',
    scaled: 'scaled',
    rotated: 'rotated',
    skewed: 'skewed',
};
FabricEventsMap.Path = {
    created: 'path:created',
};
//# sourceMappingURL=fabric-events.js.map
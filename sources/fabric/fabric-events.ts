
export class FabricEventsMap {
  public static Global_MOUSE = {
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

  public static Single_MOUSE = {
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

  public static GlobalAndSingle_Drag = {
    drop: 'drop',

    dragover: 'dragover',

    dragenter: 'dragenter',

    dragleave: 'dragleave',
  };


  public static Global_Before = {
    beforeTransform: 'before:transform',

    beforeSelectionCleared: 'before:selection:cleared',
  };

  public static Global_After = {
    afterRender: 'after:render',
  };

  public static Global_Selection = {
    cleared: 'selection:cleared',

    created: 'selection:created',

    updated: 'selection:updated',
  };


  public static Global_Object = {
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

  public static Single_Object = {
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

  public static Path = {
    created: 'path:created',
  };
}


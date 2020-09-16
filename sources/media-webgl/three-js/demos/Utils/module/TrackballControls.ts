/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin  / http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga  / http://lantiga.github.io
 */

// THREE.TrackballControls = function ( object, domElement ) {

// @ts-ignore
// import * as THREE from 'three';  // 56版本

const THREE = require('three');   // 85版本、95版本


export interface MyTrackballControlsInterface {
  object: THREE.PerspectiveCamera;
  domElement: HTMLElement | Document;
  enabled: boolean;
  screen: { left: number, top: number, width: number, height: number };


  rotateSpeed: number;
  zoomSpeed: number;
  panSpeed: number;

  noRotate: boolean;
  noZoom: boolean;
  noPan: boolean;

  staticMoving: boolean;

  dynamicDampingFactor: number;

  minDistance: number;

  maxDistance: number;

  keys: number[];

  target: THREE.Vector3;

  target0: THREE.Vector3;
  position0: THREE.Vector3;


  up0: THREE.Vector3;

  handleResize: () => void;
  handleEvent: (event: any) => void;

  [key: string]: any;

}

const __MyTrackballControls = function (this: MyTrackballControlsInterface,
                                        object: THREE.PerspectiveCamera, domElement?: HTMLElement) {

  const that = this;
  const STATE = {NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4};

  this.object = object;
  this.domElement = (domElement !== undefined) ? domElement : document;

  // API

  this.enabled = true;

  this.screen = {left: 0, top: 0, width: 0, height: 0};

  this.rotateSpeed = 1.0;
  this.zoomSpeed = 1.2;
  this.panSpeed = 0.3;

  this.noRotate = false;
  this.noZoom = false;
  this.noPan = false;

  this.staticMoving = false;
  this.dynamicDampingFactor = 0.2;

  this.minDistance = 0;
  this.maxDistance = Infinity;

  this.keys = [65 /*A*/, 83 /*S*/, 68 /*D*/];

  // internals

  this.target = new THREE.Vector3();

  const EPS = 0.000001;

  const lastPosition = new THREE.Vector3();

  let _state = STATE.NONE,
    _prevState = STATE.NONE;
  const _eye = new THREE.Vector3(),

    _movePrev = new THREE.Vector2(),
    _moveCurr = new THREE.Vector2(),

    _lastAxis = new THREE.Vector3();
  let _lastAngle = 0;
  const _zoomStart = new THREE.Vector2(),
    _zoomEnd = new THREE.Vector2();
  let _touchZoomDistanceStart = 0,
    _touchZoomDistanceEnd = 0;
  const _panStart = new THREE.Vector2(),
    _panEnd = new THREE.Vector2();

  // for reset

  this.target0 = this.target.clone();
  this.position0 = this.object.position.clone();
  this.up0 = this.object.up.clone();

  // events

  const changeEvent = {type: 'change'};
  const startEvent = {type: 'start'};
  const endEvent = {type: 'end'};


  // methods

  this.handleResize = function () {

    if (this.domElement === document) {

      this.screen.left = 0;
      this.screen.top = 0;
      this.screen.width = window.innerWidth;
      this.screen.height = window.innerHeight;

    } else {

      const box = (this.domElement as HTMLElement).getBoundingClientRect();
      // adjustments come from similar code in the jquery offset() function
      if (this.domElement.ownerDocument) {
        const d = this.domElement.ownerDocument.documentElement;
        this.screen.left = box.left + window.pageXOffset - d.clientLeft;
        this.screen.top = box.top + window.pageYOffset - d.clientTop;
        this.screen.width = box.width;
        this.screen.height = box.height;
      }

    }

  };

  this.handleEvent = function (event: any) {

    if (typeof this[event.type] == 'function') {

      this[event.type](event);

    }

  };

  const getMouseOnScreen = (function () {

    const vector = new THREE.Vector2();

    return function getMouseOnScreen (pageX: number, pageY: number) {

      vector.set(
        (pageX - that.screen.left) / that.screen.width,
        (pageY - that.screen.top) / that.screen.height,
      );

      return vector;

    };

  }());

  const getMouseOnCircle = (function () {

    const vector = new THREE.Vector2();

    return function getMouseOnCircle (pageX: number, pageY: number) {

      vector.set(
        ((pageX - that.screen.width * 0.5 - that.screen.left) / (that.screen.width * 0.5)),
        ((that.screen.height + 2 * (that.screen.top - pageY)) / that.screen.width), // screen.width intentional
      );

      return vector;

    };

  }());

  this.rotateCamera = (function () {

    const axis = new THREE.Vector3(),
      quaternion = new THREE.Quaternion(),
      eyeDirection = new THREE.Vector3(),
      objectUpDirection = new THREE.Vector3(),
      objectSidewaysDirection = new THREE.Vector3(),
      moveDirection = new THREE.Vector3();
    let angle;

    return function rotateCamera () {

      moveDirection.set(_moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0);
      angle = moveDirection.length();

      if (angle) {

        _eye.copy(that.object.position).sub(that.target);

        eyeDirection.copy(_eye).normalize();
        objectUpDirection.copy(that.object.up).normalize();
        objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();

        objectUpDirection.setLength(_moveCurr.y - _movePrev.y);
        objectSidewaysDirection.setLength(_moveCurr.x - _movePrev.x);

        moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));

        axis.crossVectors(moveDirection, _eye).normalize();

        angle *= that.rotateSpeed;
        quaternion.setFromAxisAngle(axis, angle);

        _eye.applyQuaternion(quaternion);
        that.object.up.applyQuaternion(quaternion);

        _lastAxis.copy(axis);
        _lastAngle = angle;

      } else if (!that.staticMoving && _lastAngle) {

        _lastAngle *= Math.sqrt(1.0 - that.dynamicDampingFactor);
        _eye.copy(that.object.position).sub(that.target);
        quaternion.setFromAxisAngle(_lastAxis, _lastAngle);
        _eye.applyQuaternion(quaternion);
        that.object.up.applyQuaternion(quaternion);

      }

      _movePrev.copy(_moveCurr);

    };

  }());


  this.zoomCamera = function () {

    let factor;

    if (_state === STATE.TOUCH_ZOOM_PAN) {

      factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
      _touchZoomDistanceStart = _touchZoomDistanceEnd;
      _eye.multiplyScalar(factor);

    } else {

      factor = 1.0 + (_zoomEnd.y - _zoomStart.y) * that.zoomSpeed;

      if (factor !== 1.0 && factor > 0.0) {

        _eye.multiplyScalar(factor);

      }

      if (that.staticMoving) {

        _zoomStart.copy(_zoomEnd);

      } else {

        _zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;

      }

    }

  };

  this.panCamera = (function () {

    const mouseChange = new THREE.Vector2(),
      objectUp = new THREE.Vector3(),
      pan = new THREE.Vector3();

    return function panCamera () {

      mouseChange.copy(_panEnd).sub(_panStart);

      if (mouseChange.lengthSq()) {

        mouseChange.multiplyScalar(_eye.length() * that.panSpeed);

        pan.copy(_eye).cross(that.object.up).setLength(mouseChange.x);
        pan.add(objectUp.copy(that.object.up).setLength(mouseChange.y));

        that.object.position.add(pan);
        that.target.add(pan);

        if (that.staticMoving) {

          _panStart.copy(_panEnd);

        } else {

          _panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(that.dynamicDampingFactor));

        }

      }

    };

  }());

  this.checkDistances = function () {

    if (!that.noZoom || !that.noPan) {

      if (_eye.lengthSq() > that.maxDistance * that.maxDistance) {

        that.object.position.addVectors(that.target, _eye.setLength(that.maxDistance));
        _zoomStart.copy(_zoomEnd);

      }

      if (_eye.lengthSq() < that.minDistance * that.minDistance) {

        that.object.position.addVectors(that.target, _eye.setLength(that.minDistance));
        _zoomStart.copy(_zoomEnd);

      }

    }

  };

  this.update = function () {

    _eye.subVectors(that.object.position, that.target);

    if (!that.noRotate) {

      that.rotateCamera();

    }

    if (!that.noZoom) {

      that.zoomCamera();

    }

    if (!that.noPan) {

      that.panCamera();

    }

    that.object.position.addVectors(that.target, _eye);

    that.checkDistances();

    that.object.lookAt(that.target);

    if (lastPosition.distanceToSquared(that.object.position) > EPS) {

      that.dispatchEvent(changeEvent);

      lastPosition.copy(that.object.position);

    }

  };

  this.reset = function () {

    _state = STATE.NONE;
    _prevState = STATE.NONE;

    that.target.copy(that.target0);
    that.object.position.copy(that.position0);
    that.object.up.copy(that.up0);

    _eye.subVectors(that.object.position, that.target);

    that.object.lookAt(that.target);

    that.dispatchEvent(changeEvent);

    lastPosition.copy(that.object.position);

  };

  // listeners

  function keydown (event: any) {

    if (that.enabled === false) { return; }

    window.removeEventListener('keydown', keydown);

    _prevState = _state;

    if (_state !== STATE.NONE) {

      return;

    } else if (event.keyCode === that.keys[STATE.ROTATE] && !that.noRotate) {

      _state = STATE.ROTATE;

    } else if (event.keyCode === that.keys[STATE.ZOOM] && !that.noZoom) {

      _state = STATE.ZOOM;

    } else if (event.keyCode === that.keys[STATE.PAN] && !that.noPan) {

      _state = STATE.PAN;

    }

  }

  function keyup (event: any) {

    if (that.enabled === false) { return; }

    _state = _prevState;

    window.addEventListener('keydown', keydown, false);

  }

  function mousedown (event: any) {

    if (that.enabled === false) { return; }

    event.preventDefault();
    event.stopPropagation();

    if (_state === STATE.NONE) {

      _state = event.button;

    }

    if (_state === STATE.ROTATE && !that.noRotate) {

      _moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
      _movePrev.copy(_moveCurr);

    } else if (_state === STATE.ZOOM && !that.noZoom) {

      _zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));
      _zoomEnd.copy(_zoomStart);

    } else if (_state === STATE.PAN && !that.noPan) {

      _panStart.copy(getMouseOnScreen(event.pageX, event.pageY));
      _panEnd.copy(_panStart);

    }

    document.addEventListener('mousemove', mousemove, false);
    document.addEventListener('mouseup', mouseup, false);

    that.dispatchEvent(startEvent);

  }

  function mousemove (event: any) {

    if (that.enabled === false) { return; }

    event.preventDefault();
    event.stopPropagation();

    if (_state === STATE.ROTATE && !that.noRotate) {

      _movePrev.copy(_moveCurr);
      _moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));

    } else if (_state === STATE.ZOOM && !that.noZoom) {

      _zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));

    } else if (_state === STATE.PAN && !that.noPan) {

      _panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));

    }

  }

  function mouseup (event: any) {

    if (that.enabled === false) { return; }

    event.preventDefault();
    event.stopPropagation();

    _state = STATE.NONE;

    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    that.dispatchEvent(endEvent);

  }

  function mousewheel (event: any) {

    if (that.enabled === false) { return; }

    event.preventDefault();
    event.stopPropagation();

    switch (event.deltaMode) {

      case 2:
        // Zoom in pages
        _zoomStart.y -= event.deltaY * 0.025;
        break;

      case 1:
        // Zoom in lines
        _zoomStart.y -= event.deltaY * 0.01;
        break;

      default:
        // undefined, 0, assume pixels
        _zoomStart.y -= event.deltaY * 0.00025;
        break;

    }

    that.dispatchEvent(startEvent);
    that.dispatchEvent(endEvent);

  }

  function touchstart (event: any) {

    if (that.enabled === false) { return; }

    switch (event.touches.length) {

      case 1:{
        _state = STATE.TOUCH_ROTATE;
        _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
        _movePrev.copy(_moveCurr);
        break;
      }
      default:{ // 2 or more
        _state = STATE.TOUCH_ZOOM_PAN;
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

        const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        _panStart.copy(getMouseOnScreen(x, y));
        _panEnd.copy(_panStart);
        break;
      }
    }

    that.dispatchEvent(startEvent);

  }

  function touchmove (event: any) {

    if (that.enabled === false) { return; }

    event.preventDefault();
    event.stopPropagation();

    switch (event.touches.length) {

      case 1:{
        _movePrev.copy(_moveCurr);
        _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
        break;
      }
      default:{ // 2 or more
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        _touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

        const x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        const y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        _panEnd.copy(getMouseOnScreen(x, y));
        break;
      }
    }

  }

  function touchend (event: any) {

    if (that.enabled === false) { return; }

    switch (event.touches.length) {

      case 0:
        _state = STATE.NONE;
        break;

      case 1:
        _state = STATE.TOUCH_ROTATE;
        _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
        _movePrev.copy(_moveCurr);
        break;

    }

    that.dispatchEvent(endEvent);

  }

  function contextmenu (event: any) {

    event.preventDefault();

  }

  this.dispose = function () {

    this.domElement.removeEventListener('contextmenu', contextmenu, false);
    this.domElement.removeEventListener('mousedown', mousedown, false);
    this.domElement.removeEventListener('wheel', mousewheel, false);

    this.domElement.removeEventListener('touchstart', touchstart, false);
    this.domElement.removeEventListener('touchend', touchend, false);
    this.domElement.removeEventListener('touchmove', touchmove, false);

    document.removeEventListener('mousemove', mousemove, false);
    document.removeEventListener('mouseup', mouseup, false);

    window.removeEventListener('keydown', keydown, false);
    window.removeEventListener('keyup', keyup, false);

  };

  this.domElement.addEventListener('contextmenu', contextmenu, false);
  this.domElement.addEventListener('mousedown', mousedown, false);
  this.domElement.addEventListener('wheel', mousewheel, false);

  this.domElement.addEventListener('touchstart', touchstart, false);
  this.domElement.addEventListener('touchend', touchend, false);
  this.domElement.addEventListener('touchmove', touchmove, false);

  window.addEventListener('keydown', keydown, false);
  window.addEventListener('keyup', keyup, false);

  this.handleResize();

  // force an update at start
  this.update();

} as any as new(object: THREE.PerspectiveCamera, domElement?: HTMLElement) => MyTrackballControlsInterface;

// TODO 以下这两句，虽然不起眼，但是一定要加上！！！
// TODO 以下这两句，虽然不起眼，但是一定要加上！！！
// TODO 以下这两句，虽然不起眼，但是一定要加上！！！
// 不然【dispatchEvent】之类的方法，都会是  undefined
//
// THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
// THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;
//

__MyTrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
__MyTrackballControls.prototype.constructor = __MyTrackballControls;

export const xX_MyTrackballControls = __MyTrackballControls;

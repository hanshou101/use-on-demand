/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
import { __extends } from "tslib";
var THREE = require('three'); // 85版本、95版本
// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finger swipe
var xX_MyOrbitControls = /** @class */ (function (_super) {
    __extends(xX_MyOrbitControls, _super);
    function xX_MyOrbitControls(object, domElement) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var _this = _super.call(this) || this;
        _this.object = object;
        _this.domElement = (domElement !== undefined) ? domElement : document;
        // Set to false to disable this control
        _this.enabled = true;
        // "target" sets the location of focus, where the object orbits around
        _this.target = new THREE.Vector3();
        // How far you can dolly in and out ( PerspectiveCamera only )
        _this.minDistance = 0;
        _this.maxDistance = Infinity;
        // How far you can zoom in and out ( OrthographicCamera only )
        _this.minZoom = 0;
        _this.maxZoom = Infinity;
        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        _this.minPolarAngle = 0; // radians
        _this.maxPolarAngle = Math.PI; // radians
        // How far you can orbit horizontally, upper and lower limits.
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        _this.minAzimuthAngle = -Infinity; // radians
        _this.maxAzimuthAngle = Infinity; // radians
        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        _this.enableDamping = false;
        _this.dampingFactor = 0.25;
        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        _this.enableZoom = true;
        _this.zoomSpeed = 1.0;
        // Set to false to disable rotating
        _this.enableRotate = true;
        _this.rotateSpeed = 1.0;
        // Set to false to disable panning
        _this.enablePan = true;
        _this.keyPanSpeed = 7.0; // pixels moved per arrow key push
        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        _this.autoRotate = false;
        _this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
        // Set to false to disable use of the keys
        _this.enableKeys = true;
        // The four arrow keys
        _this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
        // Mouse buttons
        _this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
        // for reset
        _this.target0 = _this.target.clone();
        _this.position0 = _this.object.position.clone();
        _this.zoom0 = _this.object.zoom;
        //
        //
        //
        //
        //
        //
        // 一些其它靠下部的初始化。
        _this.changeEvent = { type: 'change' };
        _this.startEvent = { type: 'start' };
        _this.endEvent = { type: 'end' };
        _this.STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };
        _this.state = _this.STATE.NONE;
        _this.EPS = 0.000001;
        // current position in spherical coordinates
        _this.spherical = new THREE.Spherical();
        _this.sphericalDelta = new THREE.Spherical();
        _this.scale = 1;
        _this.panOffset = new THREE.Vector3();
        _this.zoomChanged = false;
        _this.rotateStart = new THREE.Vector2();
        _this.rotateEnd = new THREE.Vector2();
        _this.rotateDelta = new THREE.Vector2();
        _this.panStart = new THREE.Vector2();
        _this.panEnd = new THREE.Vector2();
        _this.panDelta = new THREE.Vector2();
        _this.dollyStart = new THREE.Vector2();
        _this.dollyEnd = new THREE.Vector2();
        _this.dollyDelta = new THREE.Vector2();
        //
        //
        //
        //
        // 一些JS闭包模式书写的函数的初始化。
        // this method is exposed, but perhaps it would be better if we can make it private...
        // TODO 这里，作者想要，把方法设置为  private的（JS中，只能做到，真正的实现是未知的，参数是无法传入的。  而对于最终方法的访问，仍然是公开的。）
        // const self = this;
        //
        //
        //
        //
        //
        //
        //
        //
        // 继续的初始化
        (_b = (_a = _this.domElement).addEventListener) === null || _b === void 0 ? void 0 : _b.call(_a, 'contextmenu', _this.onContextMenu.bind(_this), false);
        (_d = (_c = _this.domElement).addEventListener) === null || _d === void 0 ? void 0 : _d.call(_c, 'mousedown', _this.onMouseDown.bind(_this), false);
        (_f = (_e = _this.domElement).addEventListener) === null || _f === void 0 ? void 0 : _f.call(_e, 'wheel', _this.onMouseWheel.bind(_this), false);
        (_h = (_g = _this.domElement).addEventListener) === null || _h === void 0 ? void 0 : _h.call(_g, 'touchstart', _this.onTouchStart.bind(_this), false);
        (_k = (_j = _this.domElement).addEventListener) === null || _k === void 0 ? void 0 : _k.call(_j, 'touchend', _this.onTouchEnd.bind(_this), false);
        (_m = (_l = _this.domElement).addEventListener) === null || _m === void 0 ? void 0 : _m.call(_l, 'touchmove', _this.onTouchMove.bind(_this), false);
        window.addEventListener('keydown', _this.onKeyDown.bind(_this), false);
        // force an update at start
        console.log('this', _this);
        _this.update();
        return _this;
    }
    xX_MyOrbitControls.prototype.update = function () {
        console.log('MyOrbitControls的update方法执行了');
        var offset = new THREE.Vector3();
        // so camera.up is the orbit axis
        var quat = new THREE.Quaternion().setFromUnitVectors(this.object.up, new THREE.Vector3(0, 1, 0));
        var quatInverse = quat.clone().inverse();
        var lastPosition = new THREE.Vector3();
        var lastQuaternion = new THREE.Quaternion();
        var position = this.object.position;
        offset.copy(position).sub(this.target);
        // rotate offset to "y-axis-is-up" space
        offset.applyQuaternion(quat);
        // angle from z-axis around y-axis
        this.spherical.setFromVector3(offset);
        if (this.autoRotate && this.state === this.STATE.NONE) {
            this.rotateLeft(this.getAutoRotationAngle());
        }
        this.spherical.theta += this.sphericalDelta.theta;
        this.spherical.phi += this.sphericalDelta.phi;
        // restrict theta to be between desired limits
        this.spherical.theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, this.spherical.theta));
        // restrict phi to be between desired limits
        this.spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this.spherical.phi));
        this.spherical.makeSafe();
        this.spherical.radius *= this.scale;
        // restrict radius to be between desired limits
        this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius));
        // move target to panned location
        this.target.add(this.panOffset);
        offset.setFromSpherical(this.spherical);
        // rotate offset back to "camera-up-vector-is-up" space
        offset.applyQuaternion(quatInverse);
        position.copy(this.target).add(offset);
        this.object.lookAt(this.target);
        if (this.enableDamping === true) {
            this.sphericalDelta.theta *= (1 - this.dampingFactor);
            this.sphericalDelta.phi *= (1 - this.dampingFactor);
        }
        else {
            this.sphericalDelta.set(0, 0, 0);
        }
        this.scale = 1;
        this.panOffset.set(0, 0, 0);
        // update condition is:
        // min(camera displacement, camera rotation in radians)^2 > EPS
        // using small-angle approximation cos(x/2) = 1 - x^2 / 8
        if (this.zoomChanged ||
            lastPosition.distanceToSquared(this.object.position) > this.EPS ||
            8 * (1 - lastQuaternion.dot(this.object.quaternion)) > this.EPS) {
            this.dispatchEvent(this.changeEvent);
            lastPosition.copy(this.object.position);
            lastQuaternion.copy(this.object.quaternion);
            this.zoomChanged = false;
            return true;
        }
        return false;
    };
    xX_MyOrbitControls.prototype.panLeft = function (distance, objectMatrix) {
        var v = new THREE.Vector3();
        v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
        v.multiplyScalar(-distance);
        this.panOffset.add(v);
    };
    xX_MyOrbitControls.prototype.panUp = function (distance, objectMatrix) {
        var v = new THREE.Vector3();
        v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
        v.multiplyScalar(distance);
        this.panOffset.add(v);
    };
    // deltaX and deltaY are in pixels; right and down are positive
    xX_MyOrbitControls.prototype.pan = function (deltaX, deltaY) {
        var offset = new THREE.Vector3();
        var element = this.domElement === document ? this.domElement.body : this.domElement;
        if (this.object.isPerspectiveCamera) {
            // perspective
            var position = this.object.position;
            offset.copy(position).sub(this.target);
            var targetDistance = offset.length();
            // half of the fov is center to top of screen
            targetDistance *= Math.tan((this.object.fov / 2) * Math.PI / 180.0);
            // we actually don't use screenWidth, since perspective camera is fixed to screen height
            this.panLeft(2 * deltaX * targetDistance / element.clientHeight, this.object.matrix);
            this.panUp(2 * deltaY * targetDistance / element.clientHeight, this.object.matrix);
        }
        else if (this.object.isOrthographicCamera) {
            // orthographic
            this.panLeft(deltaX * (this.object.right - this.object.left) / this.object.zoom / element.clientWidth, this.object.matrix);
            this.panUp(deltaY * (this.object.top - this.object.bottom) / this.object.zoom / element.clientHeight, this.object.matrix);
        }
        else {
            // camera neither orthographic nor perspective
            console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
            this.enablePan = false;
        }
    };
    // TIP 以上，为Data和构造函数区域
    //
    //
    //
    //
    //
    //
    // TIP 以下，为方法区域
    xX_MyOrbitControls.prototype.getPolarAngle = function () {
        return this.spherical.phi;
    };
    xX_MyOrbitControls.prototype.getAzimuthalAngle = function () {
        return this.spherical.theta;
    };
    xX_MyOrbitControls.prototype.saveState = function () {
        this.target0.copy(this.target);
        this.position0.copy(this.object.position);
        this.zoom0 = this.object.zoom;
    };
    xX_MyOrbitControls.prototype.reset = function () {
        this.target.copy(this.target0);
        this.object.position.copy(this.position0);
        this.object.zoom = this.zoom0;
        this.object.updateProjectionMatrix();
        this.dispatchEvent(this.changeEvent);
        this.update();
        this.state = this.STATE.NONE;
    };
    xX_MyOrbitControls.prototype.dispose = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        (_b = (_a = this.domElement).removeEventListener) === null || _b === void 0 ? void 0 : _b.call(_a, 'contextmenu', this.onContextMenu, false);
        (_d = (_c = this.domElement).removeEventListener) === null || _d === void 0 ? void 0 : _d.call(_c, 'mousedown', this.onMouseDown, false);
        (_f = (_e = this.domElement).removeEventListener) === null || _f === void 0 ? void 0 : _f.call(_e, 'wheel', this.onMouseWheel, false);
        (_h = (_g = this.domElement).removeEventListener) === null || _h === void 0 ? void 0 : _h.call(_g, 'touchstart', this.onTouchStart, false);
        (_k = (_j = this.domElement).removeEventListener) === null || _k === void 0 ? void 0 : _k.call(_j, 'touchend', this.onTouchEnd, false);
        (_m = (_l = this.domElement).removeEventListener) === null || _m === void 0 ? void 0 : _m.call(_l, 'touchmove', this.onTouchMove, false);
        (_o = document.removeEventListener) === null || _o === void 0 ? void 0 : _o.call(document, 'mousemove', this.onMouseMove, false);
        (_p = document.removeEventListener) === null || _p === void 0 ? void 0 : _p.call(document, 'mouseup', this.onMouseUp, false);
        window.removeEventListener('keydown', this.onKeyDown, false);
        // this.dispatchEvent( { type: 'dispose' } ); // should this be added here?
    };
    //
    //
    //
    //
    //
    //
    //
    //
    //  internal
    xX_MyOrbitControls.prototype.getAutoRotationAngle = function () {
        return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
    };
    xX_MyOrbitControls.prototype.getZoomScale = function () {
        return Math.pow(0.95, this.zoomSpeed);
    };
    xX_MyOrbitControls.prototype.rotateLeft = function (angle) {
        this.sphericalDelta.theta -= angle;
    };
    xX_MyOrbitControls.prototype.rotateUp = function (angle) {
        this.sphericalDelta.phi -= angle;
    };
    xX_MyOrbitControls.prototype.dollyIn = function (dollyScale) {
        if (this.object.isPerspectiveCamera) {
            this.scale /= dollyScale;
        }
        else if (this.object.isOrthographicCamera) {
            this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));
            this.object.updateProjectionMatrix();
            this.zoomChanged = true;
        }
        else {
            console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
            this.enableZoom = false;
        }
    };
    xX_MyOrbitControls.prototype.dollyOut = function (dollyScale) {
        if (this.object.isPerspectiveCamera) {
            this.scale *= dollyScale;
        }
        else if (this.object.isOrthographicCamera) {
            this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));
            this.object.updateProjectionMatrix();
            this.zoomChanged = true;
        }
        else {
            console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
            this.enableZoom = false;
        }
    };
    //
    //
    //
    //
    //
    //
    //
    //
    // event callbacks - update the object state
    //
    xX_MyOrbitControls.prototype.handleMouseDownRotate = function (event) {
        // console.log( 'handleMouseDownRotate' );
        this.rotateStart.set(event.clientX, event.clientY);
    };
    xX_MyOrbitControls.prototype.handleMouseDownDolly = function (event) {
        // console.log( 'handleMouseDownDolly' );
        this.dollyStart.set(event.clientX, event.clientY);
    };
    xX_MyOrbitControls.prototype.handleMouseDownPan = function (event) {
        // console.log( 'handleMouseDownPan' );
        this.panStart.set(event.clientX, event.clientY);
    };
    xX_MyOrbitControls.prototype.handleMouseMoveRotate = function (event) {
        // console.log( 'handleMouseMoveRotate' );
        this.rotateEnd.set(event.clientX, event.clientY);
        this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
        var element = this.domElement === document ? this.domElement.body : this.domElement;
        // rotating across whole screen goes 360 degrees around
        this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientWidth * this.rotateSpeed);
        // rotating up and down along whole screen attempts to go 360, but limited to 180
        this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight * this.rotateSpeed);
        this.rotateStart.copy(this.rotateEnd);
        this.update();
    };
    xX_MyOrbitControls.prototype.handleMouseMoveDolly = function (event) {
        // console.log( 'handleMouseMoveDolly' );
        this.dollyEnd.set(event.clientX, event.clientY);
        this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
        if (this.dollyDelta.y > 0) {
            this.dollyIn(this.getZoomScale());
        }
        else if (this.dollyDelta.y < 0) {
            this.dollyOut(this.getZoomScale());
        }
        this.dollyStart.copy(this.dollyEnd);
        this.update();
    };
    xX_MyOrbitControls.prototype.handleMouseMovePan = function (event) {
        // console.log( 'handleMouseMovePan' );
        this.panEnd.set(event.clientX, event.clientY);
        this.panDelta.subVectors(this.panEnd, this.panStart);
        this.pan(this.panDelta.x, this.panDelta.y);
        this.panStart.copy(this.panEnd);
        this.update();
    };
    xX_MyOrbitControls.prototype.handleMouseUp = function (event) {
        // console.log( 'handleMouseUp' );
    };
    xX_MyOrbitControls.prototype.handleMouseWheel = function (event) {
        // console.log( 'handleMouseWheel' );
        if (event.deltaY < 0) {
            this.dollyOut(this.getZoomScale());
        }
        else if (event.deltaY > 0) {
            this.dollyIn(this.getZoomScale());
        }
        this.update();
    };
    xX_MyOrbitControls.prototype.handleKeyDown = function (event) {
        // console.log( 'handleKeyDown' );
        switch (event.keyCode) {
            case this.keys.UP:
                this.pan(0, this.keyPanSpeed);
                this.update();
                break;
            case this.keys.BOTTOM:
                this.pan(0, -this.keyPanSpeed);
                this.update();
                break;
            case this.keys.LEFT:
                this.pan(this.keyPanSpeed, 0);
                this.update();
                break;
            case this.keys.RIGHT:
                this.pan(-this.keyPanSpeed, 0);
                this.update();
                break;
        }
    };
    xX_MyOrbitControls.prototype.handleTouchStartRotate = function (event) {
        // console.log( 'handleTouchStartRotate' );
        this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
    };
    xX_MyOrbitControls.prototype.handleTouchStartDolly = function (event) {
        // console.log( 'handleTouchStartDolly' );
        var dx = event.touches[0].pageX - event.touches[1].pageX;
        var dy = event.touches[0].pageY - event.touches[1].pageY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        this.dollyStart.set(0, distance);
    };
    xX_MyOrbitControls.prototype.handleTouchStartPan = function (event) {
        // console.log( 'handleTouchStartPan' );
        this.panStart.set(event.touches[0].pageX, event.touches[0].pageY);
    };
    xX_MyOrbitControls.prototype.handleTouchMoveRotate = function (event) {
        // console.log( 'handleTouchMoveRotate' );
        this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
        this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);
        var element = this.domElement === document ? this.domElement.body : this.domElement;
        // rotating across whole screen goes 360 degrees around
        this.rotateLeft(2 * Math.PI * this.rotateDelta.x / element.clientWidth * this.rotateSpeed);
        // rotating up and down along whole screen attempts to go 360, but limited to 180
        this.rotateUp(2 * Math.PI * this.rotateDelta.y / element.clientHeight * this.rotateSpeed);
        this.rotateStart.copy(this.rotateEnd);
        this.update();
    };
    xX_MyOrbitControls.prototype.handleTouchMoveDolly = function (event) {
        // console.log( 'handleTouchMoveDolly' );
        var dx = event.touches[0].pageX - event.touches[1].pageX;
        var dy = event.touches[0].pageY - event.touches[1].pageY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        this.dollyEnd.set(0, distance);
        this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);
        if (this.dollyDelta.y > 0) {
            this.dollyOut(this.getZoomScale());
        }
        else if (this.dollyDelta.y < 0) {
            this.dollyIn(this.getZoomScale());
        }
        this.dollyStart.copy(this.dollyEnd);
        this.update();
    };
    xX_MyOrbitControls.prototype.handleTouchMovePan = function (event) {
        // console.log( 'handleTouchMovePan' );
        this.panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
        this.panDelta.subVectors(this.panEnd, this.panStart);
        this.pan(this.panDelta.x, this.panDelta.y);
        this.panStart.copy(this.panEnd);
        this.update();
    };
    xX_MyOrbitControls.prototype.handleTouchEnd = function (event) {
        // console.log( 'handleTouchEnd' );
    };
    //
    //
    //
    //
    //
    //
    //
    // event handlers - FSM: listen for events and reset state
    //
    xX_MyOrbitControls.prototype.onMouseDown = function (event) {
        var _a, _b;
        if (this.enabled === false) {
            return;
        }
        event.preventDefault();
        switch (event.button) {
            case this.mouseButtons.ORBIT:
                if (this.enableRotate === false) {
                    return;
                }
                this.handleMouseDownRotate(event);
                this.state = this.STATE.ROTATE;
                break;
            case this.mouseButtons.ZOOM:
                if (this.enableZoom === false) {
                    return;
                }
                this.handleMouseDownDolly(event);
                this.state = this.STATE.DOLLY;
                break;
            case this.mouseButtons.PAN:
                if (this.enablePan === false) {
                    return;
                }
                this.handleMouseDownPan(event);
                this.state = this.STATE.PAN;
                break;
        }
        if (this.state !== this.STATE.NONE) {
            (_a = document.addEventListener) === null || _a === void 0 ? void 0 : _a.call(document, 'mousemove', this.onMouseMove.bind(this), false);
            (_b = document.addEventListener) === null || _b === void 0 ? void 0 : _b.call(document, 'mouseup', this.onMouseUp.bind(this), false);
            this.dispatchEvent(this.startEvent);
        }
    };
    xX_MyOrbitControls.prototype.onMouseMove = function (event) {
        if (this.enabled === false) {
            return;
        }
        event.preventDefault();
        switch (this.state) {
            case this.STATE.ROTATE:
                if (this.enableRotate === false) {
                    return;
                }
                this.handleMouseMoveRotate(event);
                break;
            case this.STATE.DOLLY:
                if (this.enableZoom === false) {
                    return;
                }
                this.handleMouseMoveDolly(event);
                break;
            case this.STATE.PAN:
                if (this.enablePan === false) {
                    return;
                }
                this.handleMouseMovePan(event);
                break;
        }
    };
    xX_MyOrbitControls.prototype.onMouseUp = function (event) {
        var _a, _b;
        if (this.enabled === false) {
            return;
        }
        this.handleMouseUp(event);
        (_a = document.removeEventListener) === null || _a === void 0 ? void 0 : _a.call(document, 'mousemove', this.onMouseMove, false);
        (_b = document.removeEventListener) === null || _b === void 0 ? void 0 : _b.call(document, 'mouseup', this.onMouseUp, false);
        this.dispatchEvent(this.endEvent);
        this.state = this.STATE.NONE;
    };
    xX_MyOrbitControls.prototype.onMouseWheel = function (event) {
        if (this.enabled === false || this.enableZoom === false || (this.state !== this.STATE.NONE && this.state !== this.STATE.ROTATE)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.handleMouseWheel(event);
        this.dispatchEvent(this.startEvent); // not sure why these are here...
        this.dispatchEvent(this.endEvent);
    };
    xX_MyOrbitControls.prototype.onKeyDown = function (event) {
        if (this.enabled === false || this.enableKeys === false || this.enablePan === false) {
            return;
        }
        this.handleKeyDown(event);
    };
    xX_MyOrbitControls.prototype.onTouchStart = function (event) {
        if (this.enabled === false) {
            return;
        }
        switch (event.touches.length) {
            case 1: // one-fingered touch: rotate
                if (this.enableRotate === false) {
                    return;
                }
                this.handleTouchStartRotate(event);
                this.state = this.STATE.TOUCH_ROTATE;
                break;
            case 2: // two-fingered touch: dolly
                if (this.enableZoom === false) {
                    return;
                }
                this.handleTouchStartDolly(event);
                this.state = this.STATE.TOUCH_DOLLY;
                break;
            case 3: // three-fingered touch: pan
                if (this.enablePan === false) {
                    return;
                }
                this.handleTouchStartPan(event);
                this.state = this.STATE.TOUCH_PAN;
                break;
            default:
                this.state = this.STATE.NONE;
        }
        if (this.state !== this.STATE.NONE) {
            this.dispatchEvent(this.startEvent);
        }
    };
    xX_MyOrbitControls.prototype.onTouchMove = function (event) {
        if (this.enabled === false) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        switch (event.touches.length) {
            case 1: // one-fingered touch: rotate
                if (this.enableRotate === false) {
                    return;
                }
                if (this.state !== this.STATE.TOUCH_ROTATE) {
                    return;
                } // is this needed?...
                this.handleTouchMoveRotate(event);
                break;
            case 2: // two-fingered touch: dolly
                if (this.enableZoom === false) {
                    return;
                }
                if (this.state !== this.STATE.TOUCH_DOLLY) {
                    return;
                } // is this needed?...
                this.handleTouchMoveDolly(event);
                break;
            case 3: // three-fingered touch: pan
                if (this.enablePan === false) {
                    return;
                }
                if (this.state !== this.STATE.TOUCH_PAN) {
                    return;
                } // is this needed?...
                this.handleTouchMovePan(event);
                break;
            default:
                this.state = this.STATE.NONE;
        }
    };
    xX_MyOrbitControls.prototype.onTouchEnd = function (event) {
        if (this.enabled === false) {
            return;
        }
        this.handleTouchEnd(event);
        this.dispatchEvent(this.endEvent);
        this.state = this.STATE.NONE;
    };
    xX_MyOrbitControls.prototype.onContextMenu = function (event) {
        if (this.enabled === false) {
            return;
        }
        event.preventDefault();
    };
    return xX_MyOrbitControls;
}(THREE.EventDispatcher));
export { xX_MyOrbitControls };
//
//
//
//
//
//
//
//
//
//
//
//
// 以下，为原来的js类
// xX_MyOrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
// TODO 此处，会发现，JS的原型Copy方法，将  MyOrbitControls类的原型给  覆盖掉了。
Object.defineProperties(xX_MyOrbitControls.prototype, {
    center: {
        get: function () {
            console.warn('THREE.OrbitControls: .center has been renamed to .target');
            // @ts-ignore
            return this.target;
        },
    },
    // backward compatibility
    noZoom: {
        get: function () {
            console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
            // @ts-ignore
            return !this.enableZoom;
        },
        set: function (value) {
            console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
            // @ts-ignore
            this.enableZoom = !value;
        },
    },
    noRotate: {
        get: function () {
            console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
            // @ts-ignore
            return !this.enableRotate;
        },
        set: function (value) {
            console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
            // @ts-ignore
            this.enableRotate = !value;
        },
    },
    noPan: {
        get: function () {
            console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
            // @ts-ignore
            return !this.enablePan;
        },
        set: function (value) {
            console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
            // @ts-ignore
            this.enablePan = !value;
        },
    },
    noKeys: {
        get: function () {
            console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
            // @ts-ignore
            return !this.enableKeys;
        },
        set: function (value) {
            console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
            // @ts-ignore
            this.enableKeys = !value;
        },
    },
    staticMoving: {
        get: function () {
            console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
            // @ts-ignore
            return !this.enableDamping;
        },
        set: function (value) {
            console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
            // @ts-ignore
            this.enableDamping = !value;
        },
    },
    dynamicDampingFactor: {
        get: function () {
            console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
            // @ts-ignore
            return this.dampingFactor;
        },
        set: function (value) {
            console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
            // @ts-ignore
            this.dampingFactor = value;
        },
    },
});
//# sourceMappingURL=MyOrbitControls.js.map
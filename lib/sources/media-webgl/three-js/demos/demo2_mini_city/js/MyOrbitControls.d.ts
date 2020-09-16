/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
declare const THREE: any;
export declare class xX_MyOrbitControls extends THREE.EventDispatcher {
    dispatchEvent: (e: any) => void;
    private object;
    private readonly domElement;
    private readonly enabled;
    private readonly target;
    private readonly minDistance;
    private readonly maxDistance;
    private readonly minZoom;
    private readonly maxZoom;
    private readonly minPolarAngle;
    private readonly maxPolarAngle;
    private readonly minAzimuthAngle;
    private readonly maxAzimuthAngle;
    enableDamping: boolean;
    dampingFactor: number;
    private enableZoom;
    private readonly zoomSpeed;
    private enableRotate;
    rotateSpeed: number;
    enablePan: boolean;
    private readonly keyPanSpeed;
    private readonly autoRotate;
    private readonly autoRotateSpeed;
    private enableKeys;
    private keys;
    private mouseButtons;
    private readonly target0;
    private readonly position0;
    private zoom0;
    private readonly changeEvent;
    private readonly startEvent;
    private readonly endEvent;
    private STATE;
    private state;
    private readonly EPS;
    private readonly spherical;
    private sphericalDelta;
    private scale;
    private readonly panOffset;
    private zoomChanged;
    private readonly rotateStart;
    private readonly rotateEnd;
    private rotateDelta;
    private readonly panStart;
    private readonly panEnd;
    private panDelta;
    private readonly dollyStart;
    private readonly dollyEnd;
    private dollyDelta;
    update(): boolean;
    private panLeft;
    private panUp;
    private pan;
    constructor(object: THREE.PerspectiveCamera, domElement: HTMLElement);
    getPolarAngle(): number;
    getAzimuthalAngle(): number;
    saveState(): void;
    reset(): void;
    dispose(): void;
    getAutoRotationAngle(): number;
    getZoomScale(): number;
    rotateLeft(angle: number): void;
    rotateUp(angle: number): void;
    dollyIn(dollyScale: number): void;
    dollyOut(dollyScale: number): void;
    handleMouseDownRotate(event: any): void;
    handleMouseDownDolly(event: any): void;
    handleMouseDownPan(event: any): void;
    handleMouseMoveRotate(event: any): void;
    handleMouseMoveDolly(event: any): void;
    handleMouseMovePan(event: any): void;
    handleMouseUp(event: any): void;
    handleMouseWheel(event: any): void;
    handleKeyDown(event: any): void;
    handleTouchStartRotate(event: any): void;
    handleTouchStartDolly(event: any): void;
    handleTouchStartPan(event: any): void;
    handleTouchMoveRotate(event: any): void;
    handleTouchMoveDolly(event: any): void;
    handleTouchMovePan(event: any): void;
    handleTouchEnd(event: any): void;
    onMouseDown(event: any): void;
    onMouseMove(event: any): void;
    onMouseUp(event: any): void;
    onMouseWheel(event: any): void;
    onKeyDown(event: any): void;
    onTouchStart(event: any): void;
    onTouchMove(event: any): void;
    onTouchEnd(event: any): void;
    onContextMenu(event: any): void;
}
export {};
//# sourceMappingURL=MyOrbitControls.d.ts.map
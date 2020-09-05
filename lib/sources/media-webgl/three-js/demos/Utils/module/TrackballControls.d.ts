/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin  / http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga  / http://lantiga.github.io
 */
declare const THREE: any;
export interface MyTrackballControlsInterface {
    object: THREE.PerspectiveCamera;
    domElement: HTMLElement | Document;
    enabled: boolean;
    screen: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
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
export declare const MyTrackballControls: new (object: THREE.PerspectiveCamera, domElement?: HTMLElement | undefined) => MyTrackballControlsInterface;
export {};
//# sourceMappingURL=TrackballControls.d.ts.map